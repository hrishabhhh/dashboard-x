# Dashboard-X

Dashboard-X is a full-stack task management application built to explore production-oriented web development concepts such as authentication, authorization, task management, REST APIs, database integration, email notifications, deployment, and scalable application architecture.

The project is actively being extended with an AI-powered Risk Detection system using Python and FastAPI.

## 🚀 Features

### Authentication

- User registration and login
- JWT-based authentication
- Protected application routes
- Persistent authentication
- Secure backend authorization

### User Management

- Register application users
- View registered users
- Update user details
- Delete users
- Account-to-User mapping for task permissions

### Task Management

- Create tasks
- View all tasks
- Edit assigned tasks
- Delete created tasks
- Assign tasks to registered users
- Task priority management
- Task status management
- Due date tracking
- Automatic task list refresh

### Task Authorization

Dashboard-X implements backend-enforced task permissions.

- Authenticated users can view tasks
- Only registered application users can create/manage tasks
- Only the user assigned to a task can edit it
- Only the user who created/assigned a task can delete it

Frontend permission checks are used for UI visibility, while actual authorization is enforced by the backend.

### Email Notifications

- Automatic email notification when a task is assigned
- Personalized task assignment emails
- Task details included in notification emails

### UI / UX

- Responsive dashboard
- Dark task card interface
- Priority and status indicators
- Create Task modal
- Edit Task modal
- Delete confirmation modal
- Loading and error states
- Authentication-aware UI

## 🤖 AI Risk Detection — In Progress

Dashboard-X is being extended with an AI-powered project risk analysis system.

Instead of sending raw application data directly to an LLM, the planned architecture separates deterministic risk detection from generative AI reasoning.

### Planned Risk Signals

The system will analyze:

- Overdue tasks
- High-priority tasks approaching deadlines
- Tasks stuck in progress
- User workload imbalance
- Delivery pressure caused by clustered deadlines

### Planned AI Architecture

React Frontend
│
▼
Node.js + Express API
│
▼
Python FastAPI AI Service
│
├── Risk Detection Engine
│
├── Feature Extraction
│
└── LLM Risk Analysis
│
▼
Structured Risk Insights
│
▼
Dashboard-X
