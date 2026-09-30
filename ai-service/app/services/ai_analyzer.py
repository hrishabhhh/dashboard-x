import os
from app.schemas.ai import AIAnalysisResult
from app.prompts.risk_prompt import build_risk_prompt
from dotenv import load_dotenv
from google import genai
from google.genai import types
from app.services.ai_cache import (
    build_cache_key,
    get_cache_result,
    set_cache_result,
)

load_dotenv()
PROMPT_VERSION = "v1"
model_name = os.getenv(
    "GEMINI-MODEL",
    "gemini-3.5-flash-lite"
)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing")

client = genai.Client(api_key=api_key)

def prepare_signals_for_ai(signals: dict) -> dict:

    safe_signals = {}

    safe_signals["overdue"] = {
        "count": signals["overdue"]["count"],
        "severity": signals["overdue"]["severity"]
    }

    safe_signals["deadline"] = {
    "count": signals["deadline"]["count"],
    "severity": signals["deadline"]["severity"]
    }

    safe_signals["stagnation"] = {
        "count": signals["stagnation"]["count"],
        "severity": signals["stagnation"]["severity"]
    }

    safe_signals["workload"] = {
        "totalActiveTasks": signals["workload"]['totalActiveTasks'],
        "severity": signals["workload"]["severity"]
    }

    safe_signals["delivery_pressure"] = {
        "count": signals["delivery_pressure"]["count"],
        "severity": signals["delivery_pressure"]["severity"]
    }

    return safe_signals


def analyze_risk_with_ai(
    overall_score: float,
    overall_level: str,
    signals: dict
) -> AIAnalysisResult:

    safe_signals = prepare_signals_for_ai(signals)

    risk_data = {
         "overall_score": overall_score,
         "overall_level": overall_level,
         "signals": safe_signals,
         }

    cache_key = build_cache_key(model_name, PROMPT_VERSION, risk_data)

    cached_result = get_cache_result(cache_key)

    if cached_result is not None:
        # print("CACHE HIT - skipping Gemini")
        return AIAnalysisResult.model_validate(cached_result)

    prompt = build_risk_prompt(
        overall_score,
        overall_level,
        safe_signals
    )
    # print("CACHE MISS - calling Gemini")
    response = client.models.generate_content(
        model= model_name,
        contents=prompt,
        config = types.GenerateContentConfig(
            response_mime_type = "application/json",
            response_schema=AIAnalysisResult,
        ),
    )
    result = AIAnalysisResult.model_validate_json(response.text)

    set_cache_result(cache_key, result.model_dump())

    return result
