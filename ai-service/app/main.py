from fastapi import FastAPI
from app.schemas.task import TaskInput

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