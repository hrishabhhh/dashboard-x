import json 

# role
# task
# trusted risk data
# constraints
# output format

def build_risk_prompt(overall_score:float, overall_level:str, signals: dict) -> str:
    signals_json = json.dumps(signals, indent=2,default=str)

    prompt = f"""
    you are the project delivert risk analyst for the given data.

    your task is to interpret the trusted risk analysis provided below
    and explain the project's current delivery risks.

    Trusted Risk Data: 
    overall risk score: {overall_score}
    overall risk level: {overall_level}
    Risk Signals: {signals_json}

    Rules: 
    - Use only the provided risk data.
    - Do not invent tasks, users, deadlines, metrices, or events.
    - Do not recalculate or change the overall risk score.
    - Do not chnage the overall risk level.
    - Do not recalculate the overall signal severities.
    - Focus on explaining the risks and suggesting practical actions.

    Return the response in the exact JSON structure:
    {{
        "summary: "short explanation of the current project risks",
        "risks": [
        "risk 1",
        "risk 2"
        ],
        "recommendations": [
        "recommendation 1",
        "recommendation 2"
        ]
    }}
    """
    return prompt



