import hashlib
import json

def build_cache_key(model: str , prompt_version: str , risk_data:dict) -> str:

    all_inputs = {
        "model": model,
        "prompt_version": prompt_version,
        "risk_data": risk_data
    }

    serialized_data = json.dumps(
        all_inputs,
        sort_keys = True,
        separators = (",",":")
    )

    cache_key = hashlib.sha256(
        serialized_data.encode("utf-8")
    ).hexdigest()

    return cache_key


