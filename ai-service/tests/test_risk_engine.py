from datetime import timedelta, timezone, datetime
from app.schemas.task import TaskInput
from app.services.risk_engine import analyze_overdue_risk, analyze_deadline_risk, analyze_stagnation_risk, analyze_workload_risk, analyze_delivery_pressure_risk

def test_overdue_risk():
    now = datetime.now(timezone.utc)
    yesterday = now - timedelta(days=1)
    tomorrow = now + timedelta(days=1)

    tasks =[
        TaskInput(
            id="task-001",
            title="Test Task",
            description="Test",
            status="pending",
            priority="high",
            dueDate=yesterday,
            updatedAt=now,
            assignedTo="user-001",
            assignedBy="user-002"
        )
        
    ]

    result = analyze_overdue_risk(tasks)
    assert result["count"] == 1
    assert result["severity"] == "low"
    assert len(result["tasks"]) == 1
    assert result["tasks"][0].dueDate == yesterday
    assert result["tasks"][0].id == "task-001"

def test_deadline_risk():

    now = datetime.now(timezone.utc)

    tasks = [
    TaskInput(
        id="task-001",
        title="High Priority Within Deadline",
        description="Should be detected as deadline risk",
        status="pending",
        priority="high",
        dueDate=now + timedelta(hours=47),
        updatedAt=now,
        assignedTo="user-001",
        assignedBy="user-002"
    ),

    TaskInput(
        id="task-002",
        title="High Priority Outside Deadline",
        description="Should not be detected because it is due in 49 hours",
        status="pending",
        priority="high",
        dueDate=now + timedelta(hours=49),
        updatedAt=now,
        assignedTo="user-001",
        assignedBy="user-002"
    ),

    TaskInput(
        id="task-003",
        title="Medium Priority Within Deadline",
        description="Should not be detected because priority is medium",
        status="pending",
        priority="medium",
        dueDate=now + timedelta(hours=24),
        updatedAt=now,
        assignedTo="user-002",
        assignedBy="user-001"
    ),

    TaskInput(
        id="task-004",
        title="Completed High Priority Task",
        description="Should not be detected because task is completed",
        status="completed",
        priority="high",
        dueDate=now + timedelta(hours=24),
        updatedAt=now,
        assignedTo="user-003",
        assignedBy="user-001"
    )
]

    result = analyze_deadline_risk(tasks)

    assert result["count"] == 1
    assert result["severity"] == "low"
    assert len(result["tasks"]) == 1
    assert result["tasks"][0].id == "task-001"

def test_stagnation_risk():

    now = datetime.now(timezone.utc)

    tasks = [
    TaskInput(
        id="task-001",
        title="Stagnant Backend Task",
        description="This task has not been updated for 6 days",
        status="in-progress",
        priority="high",
        dueDate=now + timedelta(days=10),
        updatedAt=now - timedelta(days=6),
        assignedTo="user-001",
        assignedBy="user-002"
    ),

    TaskInput(
        id="task-002",
        title="Recently Updated Task",
        description="This task was updated 3 days ago",
        status="in-progress",
        priority="medium",
        dueDate=now + timedelta(days=10),
        updatedAt=now - timedelta(days=3),
        assignedTo="user-002",
        assignedBy="user-001"
    )
]

    result = analyze_stagnation_risk(tasks)
    
    assert result["count"] == 1
    assert result["severity"] == "low"
    assert len(result["tasks"]) == 1
    assert result["tasks"][0].id == "task-001"

def test_workload_risk():

    now = datetime.now(timezone.utc)

    tasks = [
    TaskInput(
        id="task-001",
        title="Task 1",
        description="Test",
        status="pending",
        priority="high",
        dueDate=now + timedelta(days=5),
        updatedAt=now,
        assignedTo="user-001",
        assignedBy="user-002"
    ),
    TaskInput(
        id="task-002",
        title="Task 2",
        description="Test",
        status="in-progress",
        priority="medium",
        dueDate=now + timedelta(days=6),
        updatedAt=now,
        assignedTo="user-001",
        assignedBy="user-002"
    ),
    TaskInput(
        id="task-003",
        title="Task 3",
        description="Test",
        status="pending",
        priority="low",
        dueDate=now + timedelta(days=7),
        updatedAt=now,
        assignedTo="user-001",
        assignedBy="user-003"
    ),
    TaskInput(
        id="task-004",
        title="Task 4",
        description="Test",
        status="pending",
        priority="medium",
        dueDate=now + timedelta(days=8),
        updatedAt=now,
        assignedTo="user-002",
        assignedBy="user-001"
    ),
    TaskInput(
        id="task-005",
        title="Task 5",
        description="Test",
        status="in-progress",
        priority="high",
        dueDate=now + timedelta(days=9),
        updatedAt=now,
        assignedTo="user-003",
        assignedBy="user-001"
    )
]


    result = analyze_workload_risk(tasks)
    print(result)
    assert result["totalActiveTasks"] == 5
    assert result["severity"] == "medium"
    assert result["workload_percentage"]["user-001"] == 60
    assert result["workload_percentage"]["user-002"] == 20
    assert result["workload_percentage"]["user-003"] == 20


def test_delivery_pressure():

    now = datetime.now(timezone.utc)

    tasks = [
    TaskInput(
        id="task-001",
        title="Task Due Soon",
        description="Should be counted in delivery pressure",
        status="pending",
        priority="medium",
        dueDate=now + timedelta(days=2),
        updatedAt=now,
        assignedTo="user-001",
        assignedBy="user-002"
    ),

    TaskInput(
        id="task-002",
        title="Task Due Later",
        description="Should not be counted in delivery pressure",
        status="in-progress",
        priority="high",
        dueDate=now + timedelta(days=5),
        updatedAt=now,
        assignedTo="user-002",
        assignedBy="user-001"
    )
]

    result = analyze_delivery_pressure_risk(tasks)

    assert result["count"] == 1
    assert result["severity"] == "low"
    assert len(result["tasks"]) == 1
    assert result["tasks"][0].id == "task-001"

