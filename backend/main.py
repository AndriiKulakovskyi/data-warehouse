from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import jwt
import uuid
import os
from passlib.context import CryptContext
from models import (
    User, UserCreate, UserInDB, UserUpdate, Token, TokenData,
    Dataset, DatasetCreate, DatasetInDB, DatasetUpdate,
    AccessRequest, AccessRequestCreate, AccessRequestInDB, AccessRequestUpdate,
    Activity, ActivityCreate, ActivityInDB,
    DatasetStats, DatasetMetadata
)
from database import (
    get_user, create_user, update_user, get_users,
    get_dataset, create_dataset, update_dataset, get_datasets,
    get_access_request, create_access_request, update_access_request, get_access_requests,
    create_activity, get_activities,
    get_dataset_stats, get_dataset_metadata
)

# Initialize FastAPI app
app = FastAPI(title="Clinical Dataset Hub API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "development_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except jwt.PyJWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def get_current_admin_user(current_user: User = Depends(get_current_active_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

# Routes
@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# User routes
@app.post("/users/", response_model=User)
async def register_user(user: UserCreate):
    db_user = get_user(username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Check if email exists
    users = get_users()
    for existing_user in users:
        if existing_user.email == user.email:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_in_db = UserInDB(
        id=str(uuid.uuid4()),
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name,
        institution=user.institution,
        is_admin=False,  # Default to non-admin
        is_active=True,
        created_at=datetime.utcnow(),
        avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={user.username}"
    )
    
    created_user = create_user(user_in_db)
    
    # Log activity
    activity = ActivityCreate(
        type="user_registered",
        user_id=None,
        target_id=created_user.id,
        dataset_id=None,
        description=f"User {created_user.username} registered"
    )
    create_activity(activity)
    
    return created_user

@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.put("/users/me/", response_model=User)
async def update_user_me(user_update: UserUpdate, current_user: User = Depends(get_current_active_user)):
    updated_user = update_user(current_user.id, user_update)
    return updated_user

@app.get("/users/", response_model=List[User])
async def read_users(skip: int = 0, limit: int = 100, current_user: User = Depends(get_current_admin_user)):
    users = get_users(skip=skip, limit=limit)
    return users

# Dataset routes
@app.post("/datasets/", response_model=Dataset)
async def create_new_dataset(dataset: DatasetCreate, current_user: User = Depends(get_current_admin_user)):
    dataset_in_db = DatasetInDB(
        id=str(uuid.uuid4()),
        name=dataset.name,
        description=dataset.description,
        institution=dataset.institution,
        data_type=dataset.data_type,
        access_type=dataset.access_type,
        collaboration_type=dataset.collaboration_type,
        contact_email=dataset.contact_email,
        sample_size=dataset.sample_size,
        year_collected=dataset.year_collected,
        keywords=dataset.keywords,
        requires_ethics_approval=dataset.requires_ethics_approval,
        has_publications=dataset.has_publications,
        owner_id=current_user.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        image_url=f"https://images.unsplash.com/photo-{1550000000 + int(uuid.uuid4().int % 9999999)}?w=400&q=80",
        is_available=True,
        access_count=0
    )
    
    created_dataset = create_dataset(dataset_in_db)
    
    # Log activity
    activity = ActivityCreate(
        type="dataset_uploaded",
        user_id=current_user.id,
        target_id=None,
        dataset_id=created_dataset.id,
        description=f"Dataset {created_dataset.name} uploaded by {current_user.username}"
    )
    create_activity(activity)
    
    return created_dataset

@app.get("/datasets/", response_model=List[Dataset])
async def read_datasets(skip: int = 0, limit: int = 100, search: Optional[str] = None, data_type: Optional[str] = None):
    datasets = get_datasets(skip=skip, limit=limit, search=search, data_type=data_type)
    return datasets

@app.get("/datasets/{dataset_id}", response_model=Dataset)
async def read_dataset(dataset_id: str):
    dataset = get_dataset(dataset_id)
    if dataset is None:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset

@app.put("/datasets/{dataset_id}", response_model=Dataset)
async def update_dataset_endpoint(dataset_id: str, dataset_update: DatasetUpdate, current_user: User = Depends(get_current_admin_user)):
    dataset = get_dataset(dataset_id)
    if dataset is None:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    updated_dataset = update_dataset(dataset_id, dataset_update)
    
    # Log activity
    activity = ActivityCreate(
        type="dataset_updated",
        user_id=current_user.id,
        target_id=None,
        dataset_id=dataset_id,
        description=f"Dataset {updated_dataset.name} updated by {current_user.username}"
    )
    create_activity(activity)
    
    return updated_dataset

@app.get("/datasets/{dataset_id}/stats", response_model=DatasetStats)
async def read_dataset_stats(dataset_id: str):
    dataset = get_dataset(dataset_id)
    if dataset is None:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    stats = get_dataset_stats(dataset_id)
    return stats

@app.get("/datasets/{dataset_id}/metadata", response_model=DatasetMetadata)
async def read_dataset_metadata(dataset_id: str):
    dataset = get_dataset(dataset_id)
    if dataset is None:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    metadata = get_dataset_metadata(dataset_id)
    return metadata

# Access request routes
@app.post("/access-requests/", response_model=AccessRequest)
async def create_new_access_request(request: AccessRequestCreate, current_user: User = Depends(get_current_active_user)):
    dataset = get_dataset(request.dataset_id)
    if dataset is None:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    # Check if user already has a pending request for this dataset
    existing_requests = get_access_requests(user_id=current_user.id, dataset_id=request.dataset_id, status="pending")
    if existing_requests:
        raise HTTPException(status_code=400, detail="You already have a pending request for this dataset")
    
    request_in_db = AccessRequestInDB(
        id=str(uuid.uuid4()),
        dataset_id=request.dataset_id,
        user_id=current_user.id,
        purpose=request.purpose,
        project_description=request.project_description,
        agree_to_dua=request.agree_to_dua,
        agree_to_terms=request.agree_to_terms,
        status="pending",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        approved_at=None,
        denied_at=None,
        expiry_date=None
    )
    
    created_request = create_access_request(request_in_db)
    
    # Log activity
    activity = ActivityCreate(
        type="access_requested",
        user_id=current_user.id,
        target_id=None,
        dataset_id=request.dataset_id,
        description=f"User {current_user.username} requested access to dataset {dataset.name}"
    )
    create_activity(activity)
    
    return created_request

@app.get("/access-requests/", response_model=List[AccessRequest])
async def read_access_requests(
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None,
    current_user: User = Depends(get_current_active_user)
):
    # Regular users can only see their own requests
    if not current_user.is_admin:
        requests = get_access_requests(user_id=current_user.id, status=status, skip=skip, limit=limit)
    else:
        # Admins can see all requests
        requests = get_access_requests(status=status, skip=skip, limit=limit)
    
    return requests

@app.get("/access-requests/{request_id}", response_model=AccessRequest)
async def read_access_request(request_id: str, current_user: User = Depends(get_current_active_user)):
    request = get_access_request(request_id)
    if request is None:
        raise HTTPException(status_code=404, detail="Access request not found")
    
    # Regular users can only see their own requests
    if not current_user.is_admin and request.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this request")
    
    return request

@app.put("/access-requests/{request_id}/approve", response_model=AccessRequest)
async def approve_access_request(request_id: str, current_user: User = Depends(get_current_admin_user)):
    request = get_access_request(request_id)
    if request is None:
        raise HTTPException(status_code=404, detail="Access request not found")
    
    if request.status != "pending":
        raise HTTPException(status_code=400, detail="Request is not in pending status")
    
    # Set expiry date to 1 year from now
    expiry_date = datetime.utcnow() + timedelta(days=365)
    
    update_data = AccessRequestUpdate(
        status="approved",
        approved_at=datetime.utcnow(),
        expiry_date=expiry_date
    )
    
    updated_request = update_access_request(request_id, update_data)
    
    # Get user and dataset info for activity log
    user = get_user(id=request.user_id)
    dataset = get_dataset(request.dataset_id)
    
    # Log activity
    activity = ActivityCreate(
        type="access_granted",
        user_id=current_user.id,
        target_id=user.id,
        dataset_id=dataset.id,
        description=f"Admin {current_user.username} granted access to dataset {dataset.name} for user {user.username}"
    )
    create_activity(activity)
    
    return updated_request

@app.put("/access-requests/{request_id}/deny", response_model=AccessRequest)
async def deny_access_request(request_id: str, current_user: User = Depends(get_current_admin_user)):
    request = get_access_request(request_id)
    if request is None:
        raise HTTPException(status_code=404, detail="Access request not found")
    
    if request.status != "pending":
        raise HTTPException(status_code=400, detail="Request is not in pending status")
    
    update_data = AccessRequestUpdate(
        status="denied",
        denied_at=datetime.utcnow()
    )
    
    updated_request = update_access_request(request_id, update_data)
    
    # Get user and dataset info for activity log
    user = get_user(id=request.user_id)
    dataset = get_dataset(request.dataset_id)
    
    # Log activity
    activity = ActivityCreate(
        type="access_denied",
        user_id=current_user.id,
        target_id=user.id,
        dataset_id=dataset.id,
        description=f"Admin {current_user.username} denied access to dataset {dataset.name} for user {user.username}"
    )
    create_activity(activity)
    
    return updated_request

# Activity routes
@app.get("/activities/", response_model=List[Activity])
async def read_activities(skip: int = 0, limit: int = 100, current_user: User = Depends(get_current_admin_user)):
    activities = get_activities(skip=skip, limit=limit)
    return activities

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Clinical Dataset Hub API"}
