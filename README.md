# Dashboard-X

Dashboard-X is a full-stack task management and project intelligence platform built using the MERN stack with a Python/FastAPI intelligence service.

The application supports authenticated task management, user assignment, backend-enforced task permissions, email notifications, and AI-assisted project delivery risk analysis.

---

## Features

### Authentication

- User registration
- Email OTP verification
- Secure login
- JWT-based authentication
- Password hashing using bcrypt
- Protected backend routes
- Persistent authentication on the frontend

### User Management

- Register authenticated accounts as application users
- View registered users
- Manage user information
- Assign tasks to registered users
- Link Account and User collections using MongoDB ObjectIds

### Task Management

- Create tasks
- Assign tasks to registered users
- View all tasks
- Edit assigned tasks
- Delete tasks based on authorization rules
- Task priority management
- Task status management
- Due date tracking
- Task creator and assignee tracking

Task statuses:

```text
pending
in-progress
completed
```

Task priorities:

```text
low
medium
high
```

---

## Task Authorization

Dashboard-X applies authorization rules on the backend instead of relying only on frontend visibility.

### Permissions

- Any authenticated account can view tasks.
- Only registered application users can create and assign tasks.
- Only the assigned user can edit a task.
- The task creator can delete the task.
- Frontend controls are used for UX, while authorization is enforced by the backend.

---

## Email Notifications

Dashboard-X sends task assignment notifications using email integration.

When a task is created, the assigned user receives information including:

- Task title
- Description
- Priority
- Due date
- Assigned by
- Assigned to

---

# AI Risk Intelligence

Dashboard-X includes a separate Python/FastAPI intelligence service for analyzing project delivery risks.

Architecture:

```text
React Frontend
      ↓
Node.js / Express API
      ↓
Python FastAPI Intelligence Service
      ↓
Deterministic Risk Engine
      ↓
Gemini AI Interpretation
```

The React application does not communicate directly with the AI service.

The Node backend acts as the trusted application boundary and sends validated task data to FastAPI.

---

## Risk Analysis Engine

Risk analysis is primarily deterministic.

The system calculates factual project risk signals before sending selected aggregated information to Gemini.

Current risk signals:

### 1. Overdue Risk

Detects active tasks whose due date has already passed.

```text
0 tasks     → none
1 task      → low
2-3 tasks   → medium
4+ tasks    → high
```

### 2. Deadline Risk

Detects high-priority tasks approaching their deadline within 48 hours.

```text
0 tasks   → none
1 task    → low
2 tasks   → medium
3+ tasks  → high
```

### 3. Task Stagnation

Detects `in-progress` tasks that have not been updated for at least five days.

```text
0 tasks   → none
1 task    → low
2 tasks   → medium
3+ tasks  → high
```

### 4. Workload Risk

Detects whether active tasks are heavily concentrated on a single user.

Workload analysis becomes active when there are at least five active tasks.

```text
> 70% assigned to one user → high
> 50% assigned to one user → medium
otherwise                  → none
```

### 5. Delivery Pressure

Detects active tasks due within the next three days.

```text
0 tasks   → none
1-2 tasks → low
3-4 tasks → medium
5+ tasks  → high
```

---

# Weighted Overall Risk Score

Dashboard-X combines individual risk signals into a weighted overall project risk score.

Current weights:

| Risk Signal       | Weight |
| ----------------- | -----: |
| Overdue           |    30% |
| Deadline          |    20% |
| Stagnation        |    10% |
| Workload          |    20% |
| Delivery Pressure |    20% |

Severity values:

```text
none   = 0
low    = 1
medium = 2
high   = 3
```

Each signal is normalized against the maximum severity and multiplied by its assigned weight.

Overall risk classification:

```text
0 - 40      → Low Risk
> 40 - < 80 → Medium Risk
80 - 100    → High Risk
```

This allows individual risk dimensions to remain visible without allowing a single high-severity signal to automatically classify the entire project as high risk.

---

# Gemini AI Integration

Gemini is used only for interpretation.

Gemini does **not** calculate:

- Overall risk score
- Overall risk level
- Individual risk severity

These values come from the deterministic risk engine.

Gemini receives sanitized aggregate data such as:

```json
{
  "overdue": {
    "count": 4,
    "severity": "high"
  },
  "stagnation": {
    "count": 1,
    "severity": "low"
  }
}
```

Sensitive or unnecessary application data such as task descriptions, task titles, and user IDs are not required for AI interpretation.

Gemini returns structured output:

```json
{
  "summary": "...",
  "risks": ["..."],
  "recommendations": ["..."]
}
```

AI responses are validated using Pydantic before being returned to the Node backend.

---

# Risk Intelligence Dashboard

The frontend contains a dedicated Risk Intelligence interface displaying:

- Overall project risk score
- Overall risk level
- AI-generated project summary
- Dynamic risk signal cards
- Severity-based visual indicators
- Number of affected tasks
- Active workload information
- Identified project risks
- AI-generated recommendations
- Loading state
- Error state
- Responsive layout

Risk cards are generated dynamically using the risk signals returned from the backend.

Example:

```text
Overdue             HIGH
Deadline            MEDIUM
Stagnation          LOW
Workload            NONE
Delivery Pressure   LOW
```

---

# Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Context API

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- REST APIs
- Email notification integration

## AI Intelligence Service

- Python
- FastAPI
- Pydantic
- Gemini API
- Google GenAI SDK
- Pytest

## Infrastructure / Development

- MongoDB Atlas
- Vercel
- Render
- Git
- GitHub
- Environment variables

---

# Project Structure

```text
dashboard-x/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   └── pages/
│   │
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   │
│   └── ...
│
└── ai-service/
    ├── app/
    │   ├── config/
    │   ├── prompts/
    │   ├── schemas/
    │   ├── services/
    │   └── main.py
    │
    ├── tests/
    └── requirements.txt
```

---

# Important Backend APIs

## Authentication

```text
POST /auth/register
POST /auth/verify-otp
POST /auth/login
GET  /auth/profile
```

## Users

```text
GET    /users
POST   /users
PATCH  /users/:id
DELETE /users/:id
```

## Tasks

```text
GET    /task
POST   /task
PATCH  /task/:id
```

## Risk Intelligence

```text
GET /task/risk-insights
```

The Node backend internally communicates with the FastAPI service.

---

# FastAPI Intelligence APIs

## Deterministic Risk Analysis

```text
POST /risk/analyze
```

Example request:

```json
{
  "tasks": [
    {
      "id": "task-id",
      "title": "Example Task",
      "description": "Task description",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2026-09-25T18:00:00.000Z",
      "updatedAt": "2026-09-20T10:00:00.000Z",
      "assignedTo": "user-id",
      "assignedBy": "user-id"
    }
  ]
}
```

## AI Interpretation

```text
POST /risk/interpret
```

The AI interpretation endpoint consumes deterministic analysis and returns structured project insights.

---

# Example Risk Response

```json
{
  "overall_risk_score": 33.33,
  "overall_risk_level": "low",
  "signals": {
    "overdue": {
      "count": 4,
      "severity": "high"
    },
    "deadline": {
      "count": 0,
      "severity": "none"
    },
    "stagnation": {
      "count": 1,
      "severity": "low"
    },
    "workload": {
      "totalActiveTasks": 4,
      "severity": "none"
    },
    "delivery_pressure": {
      "count": 0,
      "severity": "none"
    }
  },
  "ai_insights": {
    "summary": "The project currently has a low overall risk level with overdue tasks requiring attention.",
    "risks": ["Multiple overdue tasks are currently present."],
    "recommendations": [
      "Prioritize overdue tasks and remove delivery blockers."
    ]
  }
}
```

---

# Testing

The FastAPI risk engine includes automated unit tests using Pytest.

Current test coverage includes:

- Overdue risk
- Deadline risk
- Stagnation risk
- Workload risk
- Delivery pressure
- Risk score calculations
- Overall risk thresholds
- Invalid risk scores

Run tests:

```bash
cd ai-service

source venv/Scripts/activate

python -m pytest
```

---

# Environment Variables

## Backend

```env
MONGODB_URI=
JWT_SECRET=
AI_SERVICE_URL=http://127.0.0.1:8000
```

Additional email-related environment variables are required depending on the configured email provider.

## AI Service

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.5-flash-lite
```

Never commit `.env` files to GitHub.

---

# Running the Project Locally

The application currently consists of three services.

### 1. Start the Node Backend

```bash
cd backend
npm install
npm run dev
```

### 2. Start the FastAPI Intelligence Service

```bash
cd ai-service

source venv/Scripts/activate

python -m uvicorn app.main:app --reload
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Start the React Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Security Design

Dashboard-X follows several security-oriented design decisions:

- JWT authentication
- bcrypt password hashing
- Backend authorization
- Environment-based secrets
- Protected API routes
- Sanitized AI payloads
- AI service isolated from the frontend
- Pydantic validation for AI output
- Minimum required data sent to external AI services

---

# Current Development Status

Completed:

- Authentication and OTP verification
- User management
- Task management
- Task assignment
- Task authorization
- Email task notifications
- React dashboard
- MongoDB integration
- Node REST APIs
- FastAPI intelligence service
- Deterministic risk engine
- Weighted risk scoring
- Automated risk-engine tests
- Gemini AI integration
- Sanitized AI communication
- Node-to-FastAPI integration
- Risk Intelligence dashboard
- AI risk summary
- AI recommendations
- Dynamic severity-based risk cards
- Responsive dashboard layout

---

# Future Improvements

Planned improvements include:

- AI response caching
- Duplicate request prevention
- Graceful AI-service fallback
- API timeout and retry handling
- Risk analysis history
- Historical trend visualization
- Dedicated task activity history
- Better stagnation tracking using task status/activity events
- Additional project intelligence signals
- Production deployment of the FastAPI intelligence service
- Historical ML-based risk prediction as sufficient project data becomes available

---

# Author

**Hrishabh Jain**

Full Stack / MERN Developer

Core technologies:

```text
React.js
Next.js
Node.js
Express.js
MongoDB
PostgreSQL
Python
FastAPI
AI Integration
```

---

## Dashboard-X

**Task management enhanced with deterministic project risk intelligence and AI-powered delivery insights.**
