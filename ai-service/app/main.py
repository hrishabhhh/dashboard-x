from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {
        "service": "Dashboard-X AI Service",
        "status": "running"
    }