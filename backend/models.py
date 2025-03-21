from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# User models
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    institution: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    institution: Optional[str] = None
    bio: Optional[str] = None
    role: Optional[str] = None

class UserInDB(UserBase):
    id: str
    hashed_password: str
    is_admin: bool = False
    is_active: bool = True
    created_at: datetime
    avatar_url: Optional[str] = None

class User(UserBase):
    id: str
    is_admin: bool
    is_active: bool
    created_at: datetime
    avatar_url: Optional[str] = None

    class Config:
        orm_mode = True

# Token models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Dataset models
class DatasetBase(BaseModel):
    name: str
    description: str
    institution: str
    data_type: str  # imaging, questionnaire, clinical, genetic, physiological, mixed
    access_type: str  # collaboration, restricted, controlled
    collaboration_type: str  # academic, clinical, industry, government, nonprofit
    contact_email: EmailStr
    sample_size: Optional[str] = None
    year_collected: Optional[str] = None
    keywords: Optional[str] = None
    requires_ethics_approval: bool = True
    has_publications: bool = False

class DatasetCreate(DatasetBase):
    pass

class DatasetUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    institution: Optional[str] = None
    data_type: Optional[str] = None
    access_type: Optional[str] = None
    collaboration_type: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    sample_size: Optional[str] = None
    year_collected: Optional[str] = None
    keywords: Optional[str] = None
    requires_ethics_approval: Optional[bool] = None
    has_publications: Optional[bool] = None
    is_available: Optional[bool] = None

class DatasetInDB(DatasetBase):
    id: str
    owner_id: str
    created_at: datetime
    updated_at: datetime
    image_url: str
    is_available: bool = True
    access_count: int = 0

class Dataset(DatasetBase):
    id: str
    owner_id: str
    created_at: datetime
    updated_at: datetime
    image_url: str
    is_available: bool
    access_count: int

    class Config:
        orm_mode = True

# Access Request models
class AccessRequestBase(BaseModel):
    dataset_id: str
    purpose: str
    project_description: str
    agree_to_dua: bool
    agree_to_terms: bool

class AccessRequestCreate(AccessRequestBase):
    pass

class AccessRequestUpdate(BaseModel):
    status: Optional[str] = None  # pending, approved, denied
    approved_at: Optional[datetime] = None
    denied_at: Optional[datetime] = None
    expiry_date: Optional[datetime] = None

class AccessRequestInDB(AccessRequestBase):
    id: str
    user_id: str
    status: str  # pending, approved, denied
    created_at: datetime
    updated_at: datetime
    approved_at: Optional[datetime] = None
    denied_at: Optional[datetime] = None
    expiry_date: Optional[datetime] = None

class AccessRequest(AccessRequestBase):
    id: str
    user_id: str
    status: str
    created_at: datetime
    updated_at: datetime
    approved_at: Optional[datetime] = None
    denied_at: Optional[datetime] = None
    expiry_date: Optional[datetime] = None

    class Config:
        orm_mode = True

# Activity models
class ActivityBase(BaseModel):
    type: str  # user_registered, dataset_uploaded, dataset_updated, access_requested, access_granted, access_denied
    description: str

class ActivityCreate(ActivityBase):
    user_id: Optional[str] = None  # User who performed the action
    target_id: Optional[str] = None  # Target user (if applicable)
    dataset_id: Optional[str] = None  # Related dataset (if applicable)

class ActivityInDB(ActivityBase):
    id: str
    user_id: Optional[str] = None
    target_id: Optional[str] = None
    dataset_id: Optional[str] = None
    timestamp: datetime

class Activity(ActivityBase):
    id: str
    user_id: Optional[str] = None
    target_id: Optional[str] = None
    dataset_id: Optional[str] = None
    timestamp: datetime

    class Config:
        orm_mode = True

# Dataset Statistics and Metadata models
class DatasetStats(BaseModel):
    total_participants: int
    diagnosis_groups: List[Dict[str, Any]]
    demographics: Dict[str, Any]
    data_collection_period: str
    completion_rate: float
    clinical_scales: List[Dict[str, Any]]
    diagnosis_distribution: List[Dict[str, Any]]
    age_distribution: List[Dict[str, Any]]
    missing_data_percentage: float

class DatasetMetadata(BaseModel):
    total_participants: int
    diagnosis_groups: List[Dict[str, Any]]
    demographics: Dict[str, Any]
    data_collection_period: str
    completion_rate: float
    imaging: Optional[Dict[str, Any]] = None
    questionnaires: Optional[Dict[str, Any]] = None
    publications: Optional[List[Dict[str, Any]]] = None
    citation_text: Optional[str] = None
    citation_count: Optional[int] = None
