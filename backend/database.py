from typing import List, Optional, Dict, Any
from datetime import datetime
import json
import os
import random
from models import (
    User, UserInDB, UserUpdate,
    Dataset, DatasetInDB, DatasetUpdate,
    AccessRequest, AccessRequestInDB, AccessRequestUpdate,
    Activity, ActivityInDB, ActivityCreate,
    DatasetStats, DatasetMetadata
)

# In-memory database for development
# In a production environment, this would be replaced with a real database

# Initialize database files if they don't exist
DB_DIR = "db"
os.makedirs(DB_DIR, exist_ok=True)

USERS_FILE = os.path.join(DB_DIR, "users.json")
DATASETS_FILE = os.path.join(DB_DIR, "datasets.json")
ACCESS_REQUESTS_FILE = os.path.join(DB_DIR, "access_requests.json")
ACTIVITIES_FILE = os.path.join(DB_DIR, "activities.json")

# Initialize database files with empty lists if they don't exist
def init_db_file(file_path):
    if not os.path.exists(file_path):
        with open(file_path, "w") as f:
            json.dump([], f)

init_db_file(USERS_FILE)
init_db_file(DATASETS_FILE)
init_db_file(ACCESS_REQUESTS_FILE)
init_db_file(ACTIVITIES_FILE)

# Helper functions to read and write to JSON files
def read_json_file(file_path):
    with open(file_path, "r") as f:
        return json.load(f)

def write_json_file(file_path, data):
    with open(file_path, "w") as f:
        json.dump(data, f, default=str)

# User database operations
def get_user(username: Optional[str] = None, id: Optional[str] = None) -> Optional[UserInDB]:
    users = read_json_file(USERS_FILE)
    
    if username:
        for user in users:
            if user["username"] == username:
                return UserInDB(**user)
    
    if id:
        for user in users:
            if user["id"] == id:
                return UserInDB(**user)
    
    return None

def create_user(user: UserInDB) -> User:
    users = read_json_file(USERS_FILE)
    user_dict = user.dict()
    users.append(user_dict)
    write_json_file(USERS_FILE, users)
    
    # Return User model (without hashed_password)
    return User(
        id=user.id,
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        institution=user.institution,
        is_admin=user.is_admin,
        is_active=user.is_active,
        created_at=user.created_at,
        avatar_url=user.avatar_url
    )

def update_user(user_id: str, user_update: UserUpdate) -> User:
    users = read_json_file(USERS_FILE)
    
    for i, user in enumerate(users):
        if user["id"] == user_id:
            # Update only provided fields
            update_dict = user_update.dict(exclude_unset=True)
            for key, value in update_dict.items():
                users[i][key] = value
            
            write_json_file(USERS_FILE, users)
            
            # Return updated user
            return User(**users[i])
    
    return None

def get_users(skip: int = 0, limit: int = 100) -> List[User]:
    users = read_json_file(USERS_FILE)
    return [User(**user) for user in users[skip:skip+limit]]

# Dataset database operations
def get_dataset(dataset_id: str) -> Optional[Dataset]:
    datasets = read_json_file(DATASETS_FILE)
    
    for dataset in datasets:
        if dataset["id"] == dataset_id:
            return Dataset(**dataset)
    
    return None

def create_dataset(dataset: DatasetInDB) -> Dataset:
    datasets = read_json_file(DATASETS_FILE)
    dataset_dict = dataset.dict()
    datasets.append(dataset_dict)
    write_json_file(DATASETS_FILE, datasets)
    
    return Dataset(**dataset_dict)

def update_dataset(dataset_id: str, dataset_update: DatasetUpdate) -> Dataset:
    datasets = read_json_file(DATASETS_FILE)
    
    for i, dataset in enumerate(datasets):
        if dataset["id"] == dataset_id:
            # Update only provided fields
            update_dict = dataset_update.dict(exclude_unset=True)
            for key, value in update_dict.items():
                datasets[i][key] = value
            
            # Update the updated_at timestamp
            datasets[i]["updated_at"] = datetime.utcnow()
            
            write_json_file(DATASETS_FILE, datasets)
            
            # Return updated dataset
            return Dataset(**datasets[i])
    
    return None

def get_datasets(skip: int = 0, limit: int = 100, search: Optional[str] = None, data_type: Optional[str] = None) -> List[Dataset]:
    datasets = read_json_file(DATASETS_FILE)
    
    # Apply filters
    filtered_datasets = datasets
    
    if search:
        search = search.lower()
        filtered_datasets = [d for d in filtered_datasets if 
                           search in d["name"].lower() or 
                           search in d["description"].lower() or
                           (d["keywords"] and search in d["keywords"].lower())]
    
    if data_type:
        filtered_datasets = [d for d in filtered_datasets if d["data_type"] == data_type]
    
    # Apply pagination
    paginated_datasets = filtered_datasets[skip:skip+limit]
    
    return [Dataset(**dataset) for dataset in paginated_datasets]

# Access request database operations
def get_access_request(request_id: str) -> Optional[AccessRequest]:
    requests = read_json_file(ACCESS_REQUESTS_FILE)
    
    for request in requests:
        if request["id"] == request_id:
            return AccessRequest(**request)
    
    return None

def create_access_request(request: AccessRequestInDB) -> AccessRequest:
    requests = read_json_file(ACCESS_REQUESTS_FILE)
    request_dict = request.dict()
    requests.append(request_dict)
    write_json_file(ACCESS_REQUESTS_FILE, requests)
    
    return AccessRequest(**request_dict)

def update_access_request(request_id: str, request_update: AccessRequestUpdate) -> AccessRequest:
    requests = read_json_file(ACCESS_REQUESTS_FILE)
    
    for i, request in enumerate(requests):
        if request["id"] == request_id:
            # Update only provided fields
            update_dict = request_update.dict(exclude_unset=True)
            for key, value in update_dict.items():
                requests[i][key] = value
            
            # Update the updated_at timestamp
            requests[i]["updated_at"] = datetime.utcnow()
            
            write_json_file(ACCESS_REQUESTS_FILE, requests)
            
            # Return updated request
            return AccessRequest(**requests[i])
    
    return None

def get_access_requests(
    skip: int = 0, 
    limit: int = 100, 
    user_id: Optional[str] = None,
    dataset_id: Optional[str] = None,
    status: Optional[str] = None
) -> List[AccessRequest]:
    requests = read_json_file(ACCESS_REQUESTS_FILE)
    
    # Apply filters
    filtered_requests = requests
    
    if user_id:
        filtered_requests = [r for r in filtered_requests if r["user_id"] == user_id]
    
    if dataset_id:
        filtered_requests = [r for r in filtered_requests if r["dataset_id"] == dataset_id]
    
    if status:
        filtered_requests = [r for r in filtered_requests if r["status"] == status]
    
    # Apply pagination
    paginated_requests = filtered_requests[skip:skip+limit]
    
    return [AccessRequest(**request) for request in paginated_requests]

# Activity database operations
def create_activity(activity: ActivityCreate) -> Activity:
    activities = read_json_file(ACTIVITIES_FILE)
    
    activity_in_db = ActivityInDB(
        id=str(len(activities) + 1),  # Simple ID generation
        type=activity.type,
        description=activity.description,
        user_id=activity.user_id,
        target_id=activity.target_id,
        dataset_id=activity.dataset_id,
        timestamp=datetime.utcnow()
    )
    
    activity_dict = activity_in_db.dict()
    activities.append(activity_dict)
    write_json_file(ACTIVITIES_FILE, activities)
    
    return Activity(**activity_dict)

def get_activities(skip: int = 0, limit: int = 100) -> List[Activity]:
    activities = read_json_file(ACTIVITIES_FILE)
    
    # Sort by timestamp (newest first)
    sorted_activities = sorted(activities, key=lambda x: x["timestamp"], reverse=True)
    
    # Apply pagination
    paginated_activities = sorted_activities[skip:skip+limit]
    
    return [Activity(**activity) for activity in paginated_activities]

# Dataset statistics and metadata operations
def get_dataset_stats(dataset_id: str) -> DatasetStats:
    # In a real application, this would fetch actual statistics from the database
    # For this demo, we'll generate mock statistics
    
    # Get the dataset to use its properties
    dataset = get_dataset(dataset_id)
    
    # Generate mock statistics based on the dataset
    total_participants = random.randint(500, 2000)
    
    diagnosis_groups = [
        {"name": "Bipolar Disorder", "count": random.randint(100, 400)},
        {"name": "Major Depressive Disorder", "count": random.randint(200, 500)},
        {"name": "Schizophrenia", "count": random.randint(100, 300)},
        {"name": "Autism Spectrum Disorder", "count": random.randint(100, 300)},
    ]
    
    demographics = {
        "ageRange": "18-65",
        "meanAge": round(random.uniform(30, 40), 1),
        "genderDistribution": [
            {"gender": "Male", "percentage": random.randint(40, 55)},
            {"gender": "Female", "percentage": random.randint(40, 55)},
            {"gender": "Other", "percentage": random.randint(1, 5)},
        ]
    }
    
    # Ensure gender percentages sum to 100%
    total_gender = sum(item["percentage"] for item in demographics["genderDistribution"])
    if total_gender != 100:
        demographics["genderDistribution"][-1]["percentage"] += (100 - total_gender)
    
    clinical_scales = [
        {
            "name": "PHQ-9",
            "meanScore": round(random.uniform(10, 15), 1),
            "medianScore": round(random.uniform(9, 14), 1),
            "stdDeviation": round(random.uniform(4, 6), 1),
            "minScore": 0,
            "maxScore": 27,
        },
        {
            "name": "GAD-7",
            "meanScore": round(random.uniform(8, 12), 1),
            "medianScore": round(random.uniform(7, 11), 1),
            "stdDeviation": round(random.uniform(3, 5), 1),
            "minScore": 0,
            "maxScore": 21,
        },
        {
            "name": "MADRS",
            "meanScore": round(random.uniform(20, 25), 1),
            "medianScore": round(random.uniform(18, 23), 1),
            "stdDeviation": round(random.uniform(7, 9), 1),
            "minScore": 0,
            "maxScore": 60,
        },
    ]
    
    # Use the same diagnosis groups for distribution
    diagnosis_distribution = []
    for group in diagnosis_groups:
        diagnosis_distribution.append({"name": group["name"], "value": group["count"]})
    
    age_distribution = [
        {"ageGroup": "18-25", "count": random.randint(100, 300)},
        {"ageGroup": "26-35", "count": random.randint(200, 400)},
        {"ageGroup": "36-45", "count": random.randint(150, 350)},
        {"ageGroup": "46-55", "count": random.randint(100, 200)},
        {"ageGroup": "56-65", "count": random.randint(50, 150)},
    ]
    
    # Calculate data collection period based on year_collected
    data_collection_period = dataset.year_collected if dataset.year_collected else "2020-2023"
    
    # Generate random completion rate and missing data percentage
    completion_rate = round(random.uniform(85, 98), 1)
    missing_data_percentage = round(100 - completion_rate, 1)
    
    return DatasetStats(
        total_participants=total_participants,
        diagnosis_groups=diagnosis_groups,
        demographics=demographics,
        data_collection_period=data_collection_period,
        completion_rate=completion_rate,
        clinical_scales=clinical_scales,
        diagnosis_distribution=diagnosis_distribution,
        age_distribution=age_distribution,
        missing_data_percentage=missing_data_percentage
    )

def get_dataset_metadata(dataset_id: str) -> DatasetMetadata:
    # In a real application, this would fetch actual metadata from the database
    # For this demo, we'll generate mock metadata
    
    # Get the dataset to use its properties
    dataset = get_dataset(dataset_id)
    
    # Get the statistics (reuse some of the data)
    stats = get_dataset_stats(dataset_id)
    
    # Generate additional metadata based on the dataset type
    imaging = None
    questionnaires = None
    
    if dataset.data_type in ["imaging", "mixed"]:
        imaging = {
            "count": random.randint(500, 2000),
            "types": ["T1", "T2", "fMRI"] if random.random() > 0.5 else ["T1", "fMRI"]
        }
    
    if dataset.data_type in ["questionnaire", "mixed"]:
        questionnaires = {
            "count": random.randint(5, 20),
            "examples": ["PHQ-9", "GAD-7", "MADRS"]
        }
    
    # Generate publications if the dataset has publications
    publications = None
    citation_text = None
    citation_count = None
    
    if dataset.has_publications:
        publications = [
            {
                "title": f"Neural correlates of psychiatric disorders in {dataset.name}",
                "authors": "Johnson, A., Smith, B., et al.",
                "journal": "Journal of Psychiatric Research",
                "year": random.randint(2018, 2023),
                "doi": f"10.1000/xyz{random.randint(100, 999)}",
            },
            {
                "title": f"Machine learning approaches using {dataset.name}",
                "authors": "Williams, C., Brown, D., et al.",
                "journal": "Nature Psychiatry",
                "year": random.randint(2018, 2023),
                "doi": f"10.1000/abc{random.randint(100, 999)}",
            },
        ]
        
        citation_text = f"Johnson, A., Smith, B., et al. ({publications[0]['year']}). {publications[0]['title']}. {publications[0]['journal']}. https://doi.org/{publications[0]['doi']}"
        citation_count = random.randint(10, 100)
    
    return DatasetMetadata(
        total_participants=stats.total_participants,
        diagnosis_groups=stats.diagnosis_groups,
        demographics=stats.demographics,
        data_collection_period=stats.data_collection_period,
        completion_rate=stats.completion_rate,
        imaging=imaging,
        questionnaires=questionnaires,
        publications=publications,
        citation_text=citation_text,
        citation_count=citation_count
    )
