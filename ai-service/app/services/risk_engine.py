from datetime import datetime,timezone,timedelta
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
        "count": overdue_count,
        "severity": severity,
        "tasks": overdue_tasks
    }

def get_deadline_risk_tasks(tasks: list[TaskInput]) -> list[TaskInput]:
    now = datetime.now(timezone.utc)
    deadline_risk_tasks = []
    deadline_limit = now + timedelta(hours = 48)

    for task in tasks: 
        if(task.status == "completed" or task.priority != "high"):
            continue
        if(task.dueDate > now and task.dueDate <= deadline_limit):
            deadline_risk_tasks.append(task)

    return deadline_risk_tasks


def get_deadline_severity(count: int) -> str: 
    if(count >= 3):
        return "high"
    elif(count == 2):
        return "medium"
    elif(count == 1):
        return "low"
    else:
        return "none"
    
def analyze_deadline_risk(tasks: list[TaskInput]):

    deadline_risk_tasks = get_deadline_risk_tasks(tasks)
    deadline_risk_count = len(deadline_risk_tasks)
    severity = get_deadline_severity(deadline_risk_count)

    return {
        "type":"deadline",
        "count": deadline_risk_count,
        "severity": severity,
        "tasks": deadline_risk_tasks
    }

def get_stagnation_risk(tasks: list[TaskInput]) -> list[TaskInput]:
    now = datetime.now(timezone.utc)
    stagnation_risk_tasks = []
    stagnation_limit = now - timedelta(days = 5)

    for task in tasks:
        # if(task.status == "completed"):
        #     continue
        if( task.status == "in-progress" and task.updatedAt <= stagnation_limit):
            stagnation_risk_tasks.append(task)
        
    return stagnation_risk_tasks

def get_stagnation_severity(count: int) -> str:
    if(count >= 3):
        return "high"
    elif(count ==2):
        return "medium"
    elif(count == 1):
        return "low"
    else:
        return "none"

def analyze_stagnation_risk(tasks: list[TaskInput]):
    stagnation_risk_tasks = get_stagnation_risk(tasks)
    stagnation_risk_count = len(stagnation_risk_tasks)
    severity = get_stagnation_severity(stagnation_risk_count)

    return {
        "type": "stagnation",
        "count": stagnation_risk_count,
        "severity": severity,
        "tasks": stagnation_risk_tasks
    }

def get_active_workload(tasks: list[TaskInput]) -> dict:
    workload = {}

    for task in tasks:
        if(task.status == "completed"):
            continue
        if(task.assignedTo in workload):
            workload[task.assignedTo] += 1
        else:
            workload[task.assignedTo] = 1

    return workload

def get_workload_percentage(workload: dict) -> dict:
    total_active_tasks = sum(workload.values())

    workload_percentage = {}

    if(total_active_tasks == 0):
        return workload_percentage
    
    for user, task_count in workload.items():
        workload_percentage[user] = (task_count / total_active_tasks) * 100
    
    return workload_percentage

def get_workload_severity(workload_percentage: dict,
total_active_tasks: int) -> str:

    if(total_active_tasks < 5):
        return "none"
    highest_percentage = max(workload_percentage.values())

    if(highest_percentage > 70):
        return "high"
    elif(highest_percentage > 50):
        return "medium"
    else:
        return "none"

def analyze_workload_risk(tasks: list[TaskInput]) -> dict:

    workload = get_active_workload(tasks)
    workload_percentage = get_workload_percentage(workload)
    total_active_tasks = sum(workload.values())
    severity = get_workload_severity(workload_percentage, total_active_tasks)

    return {
        "type":"workload",
        "totalActiveTasks": total_active_tasks,
        "workloadpercentage": workload_percentage,
        "severity": severity
    }

    

    

