from unittest.mock import MagicMock
from app.services import ai_analyzer
from app.services import ai_cache

overall_score = 0.5
overall_level = "medium"

signals = {
    "overdue": {
        "count": 5,
        "severity": "high"
    },
    "deadline": {
        "count": 3,
        "severity": "medium"
    },
    "stagnation": {
        "count": 2,
        "severity": "low"
    },
    "workload": {
        "totalActiveTasks": 10,
        "severity": "medium"
    },
    "delivery_pressure": {
        "count": 1,
        "severity": "low"
    }
}

def test_ai_result_is_cached():
    ai_cache._CACHE.clear()

    fake_response = MagicMock()
    
    fake_response.text = """
    {
        "summary": "Project risk is currently medium.",
        "risks": ["Several overdue tasks exist."],
        "recommendations": ["Review overdue tasks."]
    }
    """
    mock_generate = MagicMock(return_value=fake_response)

    ai_analyzer.client.models.generate_content = mock_generate

    first_cache_result = ai_analyzer.analyze_risk_with_ai(overall_score,overall_level,signals)
    second_cache_result = ai_analyzer.analyze_risk_with_ai(overall_score,overall_level,signals)

    assert mock_generate.call_count == 1
    assert first_cache_result == second_cache_result