from datetime import datetime
from pydantic import BaseModel
from enum import Enum

class TaskStatus(str,Enum):
    pending = "pending"
    in_progress = "in-progress"
    completed = "completed"

class TaskPriority(str,Enum):
    low = "low"
    medium = "medium"
    hign = "high"

class TaskInput(BaseModel):
    id: str
    title: str
    description: str | None = None
    status: TaskStatus
    priority: TaskPriority
    dueDate: datetime
    updatedAt: datetime
    assignedTo: str
    assignedBy: str

class RiskAnalysisResult(BaseModel):
    tasks: list[TaskInput]


