# Clinical Dataset Hub

A secure, searchable data warehouse application that enables researchers and clinicians to discover, request access to, and share multimodal datasets related to clinical psychiatry.

## Features

- Clean, filterable dataset catalog with cards showing dataset previews, metadata, and availability status
- Detailed dataset view page with tabs for description, sample data visualization, publication history, and citation information
- Secure request workflow with customizable approval process and data usage agreements
- Admin dashboard for dataset owners to manage access requests and monitor usage analytics
- Support for various data types (imaging, questionnaires, clinical notes) with appropriate preview capabilities

## Project Structure

- `frontend/`: React frontend application
  - Built with Vite, React, TypeScript, and Tailwind CSS
  - Uses shadcn/ui components
  - Responsive design for all screen sizes

- `backend/`: FastAPI backend application
  - RESTful API for user management, dataset metadata, and access requests
  - JWT authentication for secure access
  - File-based JSON database (for development)

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)
- Python 3.9+ (for local development)

### Running with Docker

1. Clone the repository
2. Start the application:

```bash
docker-compose up
```

The application will be available at:
- Frontend: http://localhost:5173
-