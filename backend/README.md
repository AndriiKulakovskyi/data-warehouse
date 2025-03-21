# Clinical Dataset Hub Backend API

This is the backend API for the Clinical Dataset Hub application, built with FastAPI.

## Features

- User authentication and management
- Dataset metadata management
- Access request workflow
- Activity logging
- Dataset statistics and metadata

## Setup

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
pip install -r requirements.txt
```

### Running the API

```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

### API Documentation

Once the server is running, you can access the auto-generated API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication

- POST `/token` - Get access token

### Users

- POST `/users/` - Register a new user
- GET `/users/me/` - Get current user info
- PUT `/users/me/` - Update current user info
- GET `/users/` - Get all users (admin only)

### Datasets

- POST `/datasets/` - Create a new dataset (admin only)
- GET `/datasets/` - Get all datasets
- GET `/datasets/{dataset_id}` - Get dataset by ID
- PUT `/datasets/{dataset_id}` - Update dataset (admin only)
- GET `/datasets/{dataset_id}/stats` - Get dataset statistics
- GET `/datasets/{dataset_id}/metadata` - Get dataset metadata

### Access Requests

- POST `/access-requests/` - Create a new access request
- GET `/access-requests/` - Get access requests
- GET `/access-requests/{request_id}` - Get access request by ID
- PUT `/access-requests/{request_id}/approve` - Approve access request (admin only)
- PUT `/access-requests/{request_id}/deny` - Deny access request (admin only)

### Activities

- GET `/activities/` - Get activity logs (admin only)

## Database

For development purposes, this API uses a simple JSON file-based database. In a production environment, this would be replaced with a proper database like PostgreSQL.

## Security

The API uses JWT tokens for authentication. In a production environment, make sure to set a strong SECRET_KEY environment variable.
