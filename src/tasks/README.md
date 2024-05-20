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

```
git clone [URL_OF_THE_REPOSITORY]
```

### Step 2: Install Dependencies

Navigate to the project directory and install the dependencies:

```
cd [project-directory]
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file at the root of the project and configure the necessary variables:

```
MONGO_URI=mongodb://localhost:27017/yourDatabase
MONGO_USER=yourMongoUser
MONGO_PASS=yourMongoPassword
```

### Step 4: Using Docker for MongoDB

To start a MongoDB instance with Docker, run:

```
docker run --name mongodb -d -p 27017:27017 mongo
```

### Step 5: Start the Application

To start the application in development mode, use:

```
npm run start:dev
```

Alternatively, you can use the Makefile commands for easier setup and operations:

```
make install
make start
make test
```

## API Routes Overview

### Task Routes

1. **Create a Task**

   - **Method:** POST
   - **Endpoint:** `/tasks`
   - **Description:** Creates a new task with the provided data.
   - **Body:** JSON object containing task details (title, description, dueDate, priority).

2. **Get All Tasks**

   - **Method:** GET
   - **Endpoint:** `/tasks`
   - **Description:** Retrieves all tasks.

3. **Get Task by ID**

   - **Method:** GET
   - **Endpoint:** `/tasks/:id`
   - **Description:** Retrieves a task by its ID.
   - **Parameters:** `id` - The ID of the task.

4. **Update a Task**

   - **Method:** PUT
   - **Endpoint:** `/tasks/:id`
   - **Description:** Updates the task with the specified ID.
   - **Parameters:** `id` - The ID of the task.
   - **Body:** JSON object containing the fields to update.

5. **Delete a Task**
   - **Method:** DELETE
   - **Endpoint:** `/tasks/:id`
   - **Description:** Deletes the task with the specified ID.
   - **Parameters:** `id` - The ID of the task.

### User Routes

6. **Create a User**

   - **Method:** POST
   - **Endpoint:** `/users`
   - **Description:** Creates a new user with the provided data.
   - **Body:** JSON object containing user details (name, email, password).

7. **Get All Users**

   - **Method:** GET
   - **Endpoint:** `/users`
   - **Description:** Retrieves all users.

8. **Get User by ID**

   - **Method:** GET
   - **Endpoint:** `/users/:id`
   - **Description:** Retrieves a user by their ID.
   - **Parameters:** `id` - The ID of the user.

9. **Update a User**

   - **Method:** PUT
   - **Endpoint:** `/users/:id`
   - **Description:** Updates the user with the specified ID.
   - **Parameters:** `id` - The ID of the user.
   - **Body:** JSON object containing the fields to update.

10. **Delete a User**
    - **Method:** DELETE
    - **Endpoint:** `/users/:id`
    - **Description:** Deletes the user with the specified ID.
    - **Parameters:** `id` - The ID of the user.

## Conclusion

This project provides a solid foundation for a task management application, with basic functionalities for managing tasks and users. Docker facilitates the management of the MongoDB environment, making development and deployment simpler and more reproducible.
