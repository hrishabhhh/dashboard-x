from app.config.risk_config import SEVERITY_VALUES,RISK_WEIGHTS

def get_severity_value(severity: str) -> int:

    if severity not in SEVERITY_VALUES: 
        raise ValueError(f"Invalid Severity: {severity}")
    return SEVERITY_VALUES[severity]

def calculate_signal_score(signal_name: str, severity: str) -> float:

    if signal_name not in RISK_WEIGHTS:
        raise ValueError(f"Invalid Risk Signal: {signal_name}")

    max_severity = 3

    severity_value = get_severity_value(severity)
    signal_weight = RISK_WEIGHTS[signal_name]
    
    normalized_severity = severity_value / max_severity
    contribution = normalized_severity * signal_weight

    return contribution

def calculate_overall_risk_score(signals: dict) -> float:
    total_score = 0

    for signal_name, signal_data in signals.items():
        severity = signal_data["severity"]
        contribution = calculate_signal_score(signal_name, severity)
        total_score += contribution

    return total_score

def get_overall_risk_level(score: float) -> str: 

    if(score < 0 or score > 100):
        raise ValueError(f"Invalid overall risk score: {score}")
        
    if(score <= 40):
        return "low"
    elif(score < 80):
        return "medium"
    else: 
        return "high"
