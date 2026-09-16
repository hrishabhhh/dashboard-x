import pytest
from app.services.overall_risk import get_overall_risk_level,calculate_overall_risk_score

# 0     → low
# 40    → low
# 40.1  → medium
# 79.9  → medium
# 80    → high
# 100   → high

def test_overall_risk_threshold():
    assert get_overall_risk_level(0) == "low"
    assert get_overall_risk_level(40) == "low"
    assert get_overall_risk_level(40.1) == "medium"
    assert get_overall_risk_level(79.9) == "medium"
    assert get_overall_risk_level(80) == "high"
    assert get_overall_risk_level(100) == "high"

def test_invalid_overall_risk_score():

    with pytest.raises(ValueError):
        get_overall_risk_level(-1)
    with pytest.raises(ValueError):
        get_overall_risk_level(101)

def test_calculate_overall_risk_score():
    signals = {
    "overdue": {"severity": "high"},
    "deadline": {"severity": "medium"},
    "stagnation": {"severity": "low"},
    "workload": {"severity": "medium"},
    "delivery_pressure": {"severity": "high"}
    }

    result = calculate_overall_risk_score(signals)

    assert result == pytest.approx(80, abs = 0.01)


