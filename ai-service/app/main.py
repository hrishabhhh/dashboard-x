from fastapi import FastAPI
from app.schemas.task import TaskInput
from app.services.risk_engine import analyze_overdue_risk
from app.schemas.task import RiskAnalysisResult


app = FastAPI()

@app.get("/")
def root():
    return {
        "service": "Dashboard-X AI Service",
        "status": "running"
    }

@app.post("/risk/test")
def root(task : TaskInput): 
    return {
        "recieved": True,
        "task": task
    }

@app.post("/risk/analyze")
def analyze_risk(request: RiskAnalysisResult):
    overdue_risk = analyze_overdue_risk(request.tasks)
    # return {
    #     "overdueTasks": overdue_tasks,
    #     "overdueCount": len(overdue_tasks)
    # }

    return {
       "signals": {
        "overdue": overdue_risk
       }
    }