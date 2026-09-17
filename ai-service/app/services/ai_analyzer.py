from app.schemas.ai import AIAnalysisResult
from app.prompts.risk_prompt import build_risk_prompt

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
    # print(prompt)

    return prompt