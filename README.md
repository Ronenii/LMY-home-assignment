# Task Management Application

This project is a Task Management Application with a React frontend and an Express backend. It provides task-related CRUD operations and features a Dockerized setup for easy deployment.

---

## Requirements

To run this project, ensure you have the following installed:

- Docker and Docker Compose
- Node.js (v16 or later)
- npm or yarn

---

## Project Setup

### Running the Application

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Start the application using Docker Compose from the root folder:
   ```bash
   docker-compose up
   ```
   This will start both the backend server and the database.

3. Access the frontend:
   - By default, it runs at `http://localhost:5173`.

### Running Tests (Backend)

1. Navigate to the backend directory:
   ```bash
   cd ./be
   ```

2. Start the test database container:
   ```bash
   docker-compose up
   ```

3. Run the tests:
   ```bash
   npm test
   ```

### Running the Frontend in Development Mode

1. Navigate to the frontend directory:
   ```bash
   cd ./fe
   ```

2. Start the development server:
   ```bash
   npx vite
   ```
   The frontend will be available at `http://localhost:5173`.

---

## Frontend Routes

### `/`
- Redirects to `/task` if the user is logged in.
- Redirects to `/login` if the user is not logged in.

---

## Backend API Documentation

The backend runs by default on port `8000`.

### Base URL
```
http://localhost:8000
```

### Endpoints

#### **GET /health**
- **Description**: Checks the server health.
- **Response**:
  ```json
  {
    "status": "UP",
    "message": "Server is running."
  }
  ```

#### **GET /tasks**
- **Description**: Fetches all tasks.
- **Query Parameters**:
  - `status` (optional): Filters tasks by status (`open` or `done`).
  - `orderBy` (optional): Orders tasks by `created_at` or `due_date`.
  - `order` (optional): Specifies order direction (`asc` or `desc`).
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Tasks fetched successfully.",
    "data": [
      {
        "id": 1,
        "title": "Sample Task",
        "status": "open",
        ...
      }
    ]
  }
  ```

#### **GET /tasks/:id**
- **Description**: Fetches a task by ID.
- **Path Parameters**:
  - `id`: ID of the task.
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Retrieved task 1",
    "data": {
      "id": 1,
      "title": "Sample Task",
      "status": "open",
      ...
    }
  }
  ```

#### **POST /tasks**
- **Description**: Creates a new task.
- **Body Parameters**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "due_date": "2025-01-15T10:00:00Z"
  }
  ```
- **Response**:
  ```json
  {
    "status": 201,
    "message": "Task created successfully.",
    "data": {
      "id": 1,
      "title": "Task Title",
      "status": "open",
      ...
    }
  }
  ```

#### **PUT /tasks/status/:id**
- **Description**: Updates the status of a task.
- **Path Parameters**:
  - `id`: ID of the task.
- **Body Parameters**:
  ```json
  {
    "status": "done"
  }
  ```
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Task 1 status updated to done.",
    "data": {
      "id": 1,
      "status": "done",
      ...
    }
  }
  ```

#### **PUT /tasks/details/:id**
- **Description**: Updates the details of a task.
- **Path Parameters**:
  - `id`: ID of the task.
- **Body Parameters**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "due_date": "2025-01-20T10:00:00Z"
  }
  ```
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Task 1 details updated successfully.",
    "data": {
      "id": 1,
      "title": "Updated Title",
      ...
    }
  }
  ```

#### **DELETE /tasks/:id**
- **Description**: Deletes a task by ID.
- **Path Parameters**:
  - `id`: ID of the task.
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Deleted task 1 successfully.",
    "data": {
      "id": 1,
      ...
    }
  }
  ```

#### **POST /auth/login**
- **Description**: Authenticates a user and generates a JWT token.
- **Body Parameters**:
  ```json
  {
    "username": "exampleuser",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Login successful",
    "data": {
      "token": "<JWT_TOKEN>"
    }
  }
  ```

#### **POST /auth/register**
- **Description**: Registers a new user.
- **Body Parameters**:
  ```json
  {
    "username": "exampleuser",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "status": 201,
    "message": "User created successfully",
    "data": {
      "username": "exampleuser",
      "id": 1
    }
  }
  ```

