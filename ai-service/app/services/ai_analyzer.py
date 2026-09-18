import os
from app.schemas.ai import AIAnalysisResult
from app.prompts.risk_prompt import build_risk_prompt
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

model_name = os.getenv(
    "GEMINI-MODEL",
    "gemini-3.5-flash-lite"
)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing")

client = genai.Client(api_key=api_key)

def analyze_risk_with_ai(
    overall_score: float,
    overall_level: str,
    signals: dict
) -> AIAnalysisResult:

    prompt = build_risk_prompt(
        overall_score,
        overall_level,
        signals
    )
    response = client.models.generate_content(
        model= model_name,
        contents=prompt,
        config = types.GenerateContentConfig(
            response_mime_type = "application/json",
            response_schema=AIAnalysisResult,
        ),
    )
    return AIAnalysisResult.model_validate_json(response.text)

if __name__ == "__main__":

    overall_score = 56.67
    overall_level = "medium"



    signals = {
         "overdue": {
            "severity": "medium",
            "count": 2
        },
        "deadline": {
            "severity": "low",
            "count": 1
        },
        "stagnation": {
            "severity": "none",
            "count": 0
        },
        "workload": {
            "severity": "medium"
        },
        "delivery_pressure": {
            "severity": "medium",
            "count": 3
        }
    }

    result = analyze_risk_with_ai(
        overall_score,
        overall_level,
        signals
)

    print("SUMMARY:")
    print(result.summary)

    print("\nRISKS:")
    print(result.risks)

    print("\nRECOMMENDATIONS:")
    print(result.recommendations)