from fastapi import FastAPI
from app.schemas.task import TaskInput
from app.schemas.task import RiskAnalysisResult
from app.schemas.ai import RiskInterpretationRequest
from app.services.risk_engine import analyze_overdue_risk, analyze_deadline_risk, analyze_stagnation_risk, analyze_workload_risk,analyze_delivery_pressure_risk
from app.services.overall_risk import calculate_overall_risk_score,get_overall_risk_level
from app.services.ai_analyzer import analyze_risk_with_ai
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
    deadline_risk = analyze_deadline_risk(request.tasks)
    stagnation_risk = analyze_stagnation_risk(request.tasks)
    workload_risk = analyze_workload_risk(request.tasks)
    delivery_pressure_risk = analyze_delivery_pressure_risk(request.tasks)

    # return {
    #     "overdueTasks": overdue_tasks,
    #     "overdueCount": len(overdue_tasks)
    # }

    signals ={
        "overdue": overdue_risk,
        "deadline": deadline_risk,
        "stagnation": stagnation_risk,
        "workload": workload_risk,
        "delivery_pressure": delivery_pressure_risk
    }

    overall_score = calculate_overall_risk_score(signals)
    overall_level = get_overall_risk_level(overall_score)
    
    ai_prompt = analyze_risk_with_ai(
    overall_score,
    overall_level,
    signals
)

    return {
    #    "signals": {
    #     "overdue": overdue_risk,
    #     "deadline": deadline_risk,
    #     "stagnation": stagnation_risk,
    #     "workload": workload_risk,
    #     "delivery_pressure": delivery_pressure_risk
    "overall_risk_score": round(overall_score,2),
    "overall_risk_level":overall_level,
    "signals": signals,
    "ai_prompt": ai_prompt
    }

@app.post("/risk/interpret")
def interpret_risk(request: RiskInterpretationRequest): 
    analysis = analyze_risk_with_ai(
        request.overall_risk_score,
        request.overall_risk_level.value,
        request.signals
    )
    return analysis