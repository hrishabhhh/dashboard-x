from enum import Enum
from pydantic import BaseModel

class AIRiskLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class AIAnalysisResult(BaseModel):
    riskLevel: AIRiskLevel
    summary: str
    risks: list[str]
    recommendations: list[str]


