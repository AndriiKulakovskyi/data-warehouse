import json
import os
import uuid
from datetime import datetime, timedelta
from passlib.context import CryptContext

# Initialize password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Ensure database directory exists
DB_DIR = "db"
os.makedirs(DB_DIR, exist_ok=True)

# Define database file paths
USERS_FILE = os.path.join(DB_DIR, "users.json")
DATASETS_FILE = os.path.join(DB_DIR, "datasets.json")
ACCESS_REQUESTS_FILE = os.path.join(DB_DIR, "access_requests.json")
ACTIVITIES_FILE = os.path.join(DB_DIR, "activities.json")

# Create sample users
users = [
    {
        "id": str(uuid.uuid4()),
        "username": "admin@example.com",
        "email": "admin@example.com",
        "full_name": "Admin User",
        "institution": "Clinical Dataset Hub",
        "hashed_password": pwd_context.hash("password123"),
        "is_admin": True,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
    },
    {
        "id": str(uuid.uuid4()),
        "username": "researcher@example.com",
        "email": "researcher@example.com",
        "full_name": "Dr. John Smith",
        "institution": "University Medical Center",
        "hashed_password": pwd_context.hash("password123"),
        "is_admin": False,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=researcher"
    },
    {
        "id": str(uuid.uuid4()),
        "username": "sarah.johnson@stanford.edu",
        "email": "sarah.johnson@stanford.edu",
        "full_name": "Sarah Johnson",
        "institution": "Stanford University",
        "hashed_password": pwd_context.hash("password123"),
        "is_admin": False,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    {
        "id": str(uuid.uuid4()),
        "username": "m.chen@jhu.edu",
        "email": "m.chen@jhu.edu",
        "full_name": "Michael Chen",
        "institution": "Johns Hopkins University",
        "hashed_password": pwd_context.hash("password123"),
        "is_admin": False,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
    },
    {
        "id": str(uuid.uuid4()),
        "username": "e.rodriguez@ucla.edu",
        "email": "e.rodriguez@ucla.edu",
        "full_name": "Emily Rodriguez",
        "institution": "UCLA Medical Center",
        "hashed_password": pwd_context.hash("password123"),
        "is_admin": False,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
    }
]

# Create sample datasets
datasets = [
    {
        "id": "ds-001",
        "name": "Multimodal Depression Assessment Dataset",
        "description": "A comprehensive dataset containing neuroimaging, clinical assessments, and questionnaire data from 500 participants with major depressive disorder and 500 healthy controls. Data was collected between 2018-2022 across five clinical sites.",
        "institution": "Neuroscience Research Center",
        "data_type": "mixed",
        "access_type": "restricted",
        "collaboration_type": "academic",
        "contact_email": "research@neuroscience.org",
        "sample_size": "1000 participants",
        "year_collected": "2018-2022",
        "keywords": "depression, neuroimaging, questionnaires, longitudinal",
        "requires_ethics_approval": True,
        "has_publications": True,
        "owner_id": users[0]["id"],
        "created_at": (datetime.utcnow() - timedelta(days=30)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=15)).isoformat(),
        "image_url": "https://images.unsplash.com/photo-1559757175-7cb036e0d465?w=400&q=80",
        "is_available": True,
        "access_count": 24
    },
    {
        "id": "ds-002",
        "name": "Bipolar Disorder Longitudinal Study",
        "description": "Longitudinal study tracking cognitive, behavioral, and neurological changes in bipolar disorder patients over a 5-year period. Includes MRI scans, cognitive assessments, and clinical interviews.",
        "institution": "Psychiatric Research Institute",
        "data_type": "mixed",
        "access_type": "collaboration",
        "collaboration_type": "academic",
        "contact_email": "bipolar.study@psychiatric.org",
        "sample_size": "350 participants",
        "year_collected": "2017-2022",
        "keywords": "bipolar disorder, longitudinal, MRI, cognitive assessment",
        "requires_ethics_approval": True,
        "has_publications": True,
        "owner_id": users[0]["id"],
        "created_at": (datetime.utcnow() - timedelta(days=45)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=10)).isoformat(),
        "image_url": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
        "is_available": True,
        "access_count": 18
    },
    {
        "id": "ds-003",
        "name": "Anxiety Disorders Questionnaire Database",
        "description": "Comprehensive database of standardized questionnaires and clinical assessments for various anxiety disorders, including GAD, social anxiety, and panic disorder.",
        "institution": "Mental Health Consortium",
        "data_type": "questionnaire",
        "access_type": "restricted",
        "collaboration_type": "clinical",
        "contact_email": "anxiety.data@mentalhealth.org",
        "sample_size": "1500 participants",
        "year_collected": "2019-2023",
        "keywords": "anxiety, questionnaires, clinical assessment, GAD",
        "requires_ethics_approval": True,
        "has_publications": False,
        "owner_id": users[0]["id"],
        "created_at": (datetime.utcnow() - timedelta(days=60)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=5)).isoformat(),
        "image_url": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&q=80",
        "is_available": True,
        "access_count": 32
    },
    {
        "id": "ds-004",
        "name": "Schizophrenia Neuroimaging Repository",
        "description": "Repository of structural and functional MRI scans from schizophrenia patients and matched controls, with associated clinical and cognitive data.",
        "institution": "Brain Imaging Center",
        "data_type": "imaging",
        "access_type": "controlled",
        "collaboration_type": "academic",
        "contact_email": "schizophrenia.data@brainimaging.org",
        "sample_size": "500 patients, 500 controls",
        "year_collected": "2015-2021",
        "keywords": "schizophrenia, MRI, fMRI, neuroimaging",
        "requires_ethics_approval": True,
        "has_publications": True,
        "owner_id": users[0]["id"],
        "created_at": (datetime.utcnow() - timedelta(days=90)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=20)).isoformat(),
        "image_url": "https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=400&q=80",
        "is_available": True,
        "access_count": 15
    },
    {
        "id": "ds-005",
        "name": "Autism Spectrum Disorder Assessment Tools",
        "description": "Collection of standardized assessment tools, questionnaires, and clinical interview protocols for autism spectrum disorder diagnosis and research.",
        "institution": "Child Development Institute",
        "data_type": "questionnaire",
        "access_type": "restricted",
        "collaboration_type": "clinical",
        "contact_email": "autism.data@childdevelopment.org",
        "sample_size": "800 children, 200 adults",
        "year_collected": "2018-2023",
        "keywords": "autism, ASD, assessment, questionnaires, children",
        "requires_ethics_approval": True,
        "has_publications": False,
        "owner_id": users[0]["id"],
        "created_at": (datetime.utcnow() - timedelta(days=120)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=30)).isoformat(),
        "image_url": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80",
        "is_available": True,
        "access_count": 27
    },
    {
        "id": "ds-006",
        "name": "PTSD Voice Analysis Database",
        "description": "Audio recordings and voice pattern analysis from PTSD patients during therapy sessions and controlled interviews.",
        "institution": "Veterans Health Research Collaborative",
        "data_type": "mixed",
        "access_type": "collaboration",
        "collaboration_type": "academic",
        "contact_email": "ptsd.research@veterans.org",
        "sample_size": "450 participants",
        "year_collected": "2020-2023",
        "keywords": "PTSD, voice analysis, audio, therapy sessions",
        "requires_ethics_approval": True,
        "has_publications": False,
        "owner_id": users[0]["id"],
        "created_at": (datetime.utcnow() - timedelta(days=75)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=25)).isoformat(),
        "image_url": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
        "is_available": True,
        "access_count": 12
    }
]

# Create sample access requests
access_requests = [
    {
        "id": "req-001",
        "dataset_id": "ds-001",
        "user_id": users[2]["id"],  # Sarah Johnson
        "purpose": "Research on biomarkers for depression treatment response",
        "project_description": "We aim to identify neuroimaging and clinical biomarkers that predict response to different depression treatments. This dataset would be invaluable for our analysis of structural and functional brain changes associated with treatment outcomes.",
        "agree_to_dua": True,
        "agree_to_terms": True,
        "status": "pending",
        "created_at": (datetime.utcnow() - timedelta(days=5)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=5)).isoformat(),
        "approved_at": None,
        "denied_at": None,
        "expiry_date": None
    },
    {
        "id": "req-002",
        "dataset_id": "ds-002",
        "user_id": users[3]["id"],  # Michael Chen
        "purpose": "Longitudinal analysis of cognitive changes in bipolar disorder",
        "project_description": "Our research focuses on tracking cognitive changes over time in bipolar disorder and identifying patterns that might predict disease progression or treatment response. The longitudinal nature of this dataset makes it particularly valuable for our work.",
        "agree_to_dua": True,
        "agree_to_terms": True,
        "status": "pending",
        "created_at": (datetime.utcnow() - timedelta(days=7)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=7)).isoformat(),
        "approved_at": None,
        "denied_at": None,
        "expiry_date": None
    },
    {
        "id": "req-003",
        "dataset_id": "ds-003",
        "user_id": users[4]["id"],  # Emily Rodriguez
        "purpose": "Validation of a new anxiety assessment tool",
        "project_description": "We have developed a new digital assessment tool for anxiety disorders and need to validate it against established measures. This database would allow us to compare our tool's performance with gold standard assessments.",
        "agree_to_dua": True,
        "agree_to_terms": True,
        "status": "pending",
        "created_at": (datetime.utcnow() - timedelta(days=10)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=10)).isoformat(),
        "approved_at": None,
        "denied_at": None,
        "expiry_date": None
    },
    {
        "id": "req-004",
        "dataset_id": "ds-004",
        "user_id": users[1]["id"],  # John Smith
        "purpose": "Machine learning analysis of schizophrenia neuroimaging data",
        "project_description": "We are developing machine learning algorithms to identify subtle brain changes associated with schizophrenia onset and progression. This repository would provide the necessary training and validation data for our models.",
        "agree_to_dua": True,
        "agree_to_terms": True,
        "status": "approved",
        "created_at": (datetime.utcnow() - timedelta(days=30)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=25)).isoformat(),
        "approved_at": (datetime.utcnow() - timedelta(days=25)).isoformat(),
        "denied_at": None,
        "expiry_date": (datetime.utcnow() + timedelta(days=340)).isoformat()
    },
    {
        "id": "req-005",
        "dataset_id": "ds-005",
        "user_id": users[1]["id"],  # John Smith
        "purpose": "Comparative analysis of autism assessment tools",
        "project_description": "Our research aims to compare the sensitivity and specificity of different autism assessment tools across age groups. This dataset would allow us to analyze the performance of various instruments in different populations.",
        "agree_to_dua": True,
        "agree_to_terms": True,
        "status": "approved",
        "created_at": (datetime.utcnow() - timedelta(days=45)).isoformat(),
        "updated_at": (datetime.utcnow() - timedelta(days=40)).isoformat(),
        "approved_at": (datetime.utcnow() - timedelta(days=40)).isoformat(),
        "denied_at": None,
        "expiry_date": (datetime.utcnow() + timedelta(days=325)).isoformat()
    }
]

# Create sample activities
activities = [
    {
        "id": "1",
        "type": "user_registered",
        "description": f"User {users[2]['username']} registered",
        "user_id": None,
        "target_id": users[2]["id"],
        "dataset_id": None,
        "timestamp": (datetime.utcnow() - timedelta(days=15)).isoformat()
    },
    {
        "id": "2",
        "type": "user_registered",
        "description": f"User {users[3]['username']} registered",
        "user_id": None,
        "target_id": users[3]["id"],
        "dataset_id": None,
        "timestamp": (datetime.utcnow() - timedelta(days=14)).isoformat()
    },
    {
        "id": "3",
        "type": "user_registered",
        "description": f"User {users[4]['username']} registered",
        "user_id": None,
        "target_id": users[4]["id"],
        "dataset_id": None,
        "timestamp": (datetime.utcnow() - timedelta(days=13)).isoformat()
    },
    {
        "id": "4",
        "type": "dataset_uploaded",
        "description": f"Dataset {datasets[0]['name']} uploaded by {users[0]['username']}",
        "user_id": users[0]["id"],
        "target_id": None,
        "dataset_id": datasets[0]["id"],
        "timestamp": (datetime.utcnow() - timedelta(days=30)).isoformat()
    },
    {
        "id": "5",
        "type": "dataset_uploaded",
        "description": f"Dataset {datasets[1]['name']} uploaded by {users[0]['username']}",
        "user_id": users[0]["id"],
        "target_id": None,
        "dataset_id": datasets[1]["id"],
        "timestamp": (datetime.utcnow() - timedelta(days=45)).isoformat()
    },
    {
        "id": "6",
        "type": "access_requested",
        "description": f"User {users[2]['username']} requested access to dataset {datasets[0]['name']}",
        "user_id": users[2]["id"],
        "target_id": None,
        "dataset_id": datasets[0]["id"],
        "timestamp": (datetime.utcnow() - timedelta(days=5)).isoformat()
    },
    {
        "id": "7",
        "type": "access_requested",
        "description": f"User {users[3]['username']} requested access to dataset {datasets[1]['name']}",
        "user_id": users[3]["id"],
        "target_id": None,
        "dataset_id": datasets[1]["id"],
        "timestamp": (datetime.utcnow() - timedelta(days=7)).isoformat()
    },
    {
        "id": "8",
        "type": "access_granted",
        "description": f"Admin {users[0]['username']} granted access to dataset {datasets[3]['name']} for user {users[1]['username']}",
        "user_id": users[0]["id"],
        "target_id": users[1]["id"],
        "dataset_id": datasets[3]["id"],
        "timestamp": (datetime.utcnow() - timedelta(days=25)).isoformat()
    },
    {
        "id": "9",
        "type": "access_granted",
        "description": f"Admin {users[0]['username']} granted access to dataset {datasets[4]['name']} for user {users[1]['username']}",
        "user_id": users[0]["id"],
        "target_id": users[1]["id"],
        "dataset_id": datasets[4]["id"],
        "timestamp": (datetime.utcnow() - timedelta(days=40)).isoformat()
    },
    {
        "id": "10",
        "type": "dataset_updated",
        "description": f"Dataset {datasets[0]['name']} updated by {users[0]['username']}",
        "user_id": users[0]["id"],
        "target_id": None,
        "dataset_id": datasets[0]["id"],
        "timestamp": (datetime.utcnow() - timedelta(days=15)).isoformat()
    }
]

# Write data to files
def write_json_file(file_path, data):
    with open(file_path, "w") as f:
        json.dump(data, f, default=str, indent=2)

write_json_file(USERS_FILE, users)
write_json_file(DATASETS_FILE, datasets)
write_json_file(ACCESS_REQUESTS_FILE, access_requests)
write_json_file(ACTIVITIES_FILE, activities)

print("Database seeded successfully!")
print(f"Admin user: {users[0]['username']} / password123")
print(f"Regular user: {users[1]['username']} / password123")
