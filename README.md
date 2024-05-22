# README.md for Task Management Project

## Project Description

This project is a backend task management application built using NestJS and MongoDB. It allows for creating, retrieving, updating, and deleting tasks, as well as managing users associated with these tasks.

## Prerequisites

- Node.js
- npm or yarn
- Docker
- MongoDB

## Installation and Setup

### Step 1: Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone [URL_OF_THE_REPOSITORY]
```

### Step 2: Install Dependencies

Navigate to the project directory and install the dependencies:

```bash
cd [project-directory]
make install
```

### Step 3: Configure Environment Variables

Create a `.env` file at the root of the project and configure the necessary variables:

```env
MONGO_USERNAME=yourMongoUser
MONGO_PASSWORD=yourMongoPassword
MONGO_HOST=mongodb
MONGO_PORT=27017
JWT_SECRET=yourSecretKey
REDIS_HOST=redis
REDIS_PORT=6379
```

### Step 4: Using Docker for MongoDB and Redis

To start MongoDB and Redis instances with Docker, run:

```bash
make start
```

### Step 5: Start the Application

To start the application in development mode, use:

```bash
make start
```

## Additional Makefile Commands

- **Rebuild and start all containers**:

  ```bash
  make start-build
  ```

- **Restart all containers**:

  ```bash
  make restart
  ```

- **Enter the MongoDB container's terminal**:

  ```bash
  make mongo-shell
  ```

- **Connect to MongoDB terminal**:

  ```bash
  make mongo-connect
  ```

- **Enter the Redis container's terminal**:

  ```bash
  make redis-shell
  ```

- **Stop all containers**:

  ```bash
  make stop
  ```

- **Remove all containers and volumes**:

  ```bash
  make remove
  ```

- **Create a backup of MongoDB data**:

  ```bash
  make backup
  ```

- **Restore MongoDB data from a backup**:

  ```bash
  make restore
  ```

- **Clean up local MongoDB data**:
  ```bash
  make clean
  ```

## API Routes Overview

### Task Routes

1. **Login**

   - **Method:** POST
   - **Endpoint:** `/auth/login`
   - **Description:** Authenticates a user with the provided credentials.
   - **Body:** JSON object containing login credentials (email, password).

2. **Create a Task**

   - **Method:** POST
   - **Endpoint:** `/tasks`
   - **Description:** Creates a new task with the provided data.
   - **Body:** JSON object containing task details (title, description, dueDate, priority).

3. **Get All Tasks**

   - **Method:** GET
   - **Endpoint:** `/tasks`
   - **Description:** Retrieves all tasks.

4. **Get Task by ID**

   - **Method:** GET
   - **Endpoint:** `/tasks/:id`
   - **Description:** Retrieves a task by its ID.
   - **Parameters:** `id` - The ID of the task.

5. **Update a Task**

   - **Method:** PUT
   - **Endpoint:** `/tasks/:id`
   - **Description:** Updates the task with the specified ID.
   - **Parameters:** `id` - The ID of the task.
   - **Body:** JSON object containing the fields to update.

6. **Delete a Task**
   - **Method:** DELETE
   - **Endpoint:** `/tasks/:id`
   - **Description:** Deletes the task with the specified ID.
   - **Parameters:** `id` - The ID of the task.

### User Routes

1. **Create a User**

   - **Method:** POST
   - **Endpoint:** `/users`
   - **Description:** Creates a new user with the provided data.
   - **Body:** JSON object containing user details (name, email, password).

2. **Get All Users**

   - **Method:** GET
   - **Endpoint:** `/users`
   - **Description:** Retrieves all users.

3. **Get User by ID**

   - **Method:** GET
   - **Endpoint:** `/users/:id`
   - **Description:** Retrieves a user by their ID.
   - **Parameters:** `id` - The ID of the user.

4. **Update a User**

   - **Method:** PUT
   - **Endpoint:** `/users/:id`
   - **Description:** Updates the user with the specified ID.
   - **Parameters:** `id` - The ID of the user.
   - **Body:** JSON object containing the fields to update.

5. **Delete a User**
   - **Method:** DELETE
   - **Endpoint:** `/users/:id`
   - **Description:** Deletes the user with the specified ID.
   - **Parameters:** `id` - The ID of the user.

## Conclusion

This project provides a solid foundation for a task management application, with basic functionalities for managing tasks and users. Docker facilitates the management of the MongoDB and Redis environments, making development and deployment simpler and more reproducible.
