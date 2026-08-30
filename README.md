# Dashboard-X

Dashboard-X is a full-stack task and user management application built to practice and implement production-style frontend and backend development.

The project includes authentication, user management, task management, authorization, API integration, database connectivity, and deployment-ready architecture.


## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Context API
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer

### Database
- MongoDB Atlas


## Features Implemented

### Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes
- Password hashing using bcrypt
- OTP-based email verification
- Password recovery flow
- Authentication state management using Context API

### User Management
- Fetch registered users
- Display users on the frontend
- Delete users
- Identify currently logged-in registered user
- Protected user-related operations

### Task Management
- Create tasks
- Fetch and display tasks
- Assign tasks to registered users
- Set task priority
- Set task due date
- Track task status
- Update tasks
- Populate assigned user and assigned-by information

### Authorization
Only the user assigned to a task is allowed to edit that task.

Unauthorized users receive an appropriate error response.

### Frontend
- Reusable components
- Loading states
- Error states
- Responsive layouts
- Protected navigation
- Authentication-based UI
- Light/Dark theme support
- Task listing
- Create Task functionality
- Edit Task functionality

### Backend
- REST API architecture
- JWT middleware
- Controller-based request handling
- MongoDB integration
- Centralized validation and error handling
- Protected API endpoints
- Mongoose relationships using references and populate


## Task Model

A task currently contains information such as:

text
Title
Description
Assigned To
Assigned By
Status
Priority
Due Date
Created At
Updated At