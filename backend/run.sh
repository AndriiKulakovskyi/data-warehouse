#!/bin/bash

# Create database directory if it doesn't exist
mkdir -p db

# Run the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
