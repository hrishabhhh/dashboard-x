from datetime import datetime,timezone
from app.schemas.task import TaskInput

def get_overdue_task(tasks:list[TaskInput]) -> list[TaskInput]:

    now = datetime.now(timezone.utc)
    overdueTasks = []

    for task in tasks:
       if(task.status == "completed"):
        continue
      
       if(task.dueDate < now):
        overdueTasks.append(task)

    return overdueTasks

def get_overdue_severity(count: int) -> str:
    if count == 0:
        return "none"
    elif count == 1:
        return "low"
    elif(count <= 3):
        return "medium"
    else:
        return "high"

def analyze_overdue_risk(tasks: list[TaskInput]):
    overdue_tasks = get_overdue_task(tasks)
    overdue_count = len(overdue_tasks)
    severity = get_overdue_severity(overdue_count)
    
    return {
        "type": "overdue",
        "overdueCount": overdue_count,
        "severity": severity,
        "tasks": overdue_tasks
    }