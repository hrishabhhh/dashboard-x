import hashlib
import json
import time
_CACHE = {}
CACHE_TTL_SECONDS= 600

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


def get_cache_result(key: str):

    if key not in _CACHE:
        return None

    cache_entry = _CACHE[key]

    current_time = time.monotonic()

    if current_time >= cache_entry['expires_at']:
        del _CACHE[key]
        return None

    return cache_entry["value"]

def set_cache_result(key: str, value: dict):

    _CACHE[key]= {
        "value": value,
        "expires_at": time.monotonic() + CACHE_TTL_SECONDS
    }



    

if __name__ == "__main__":

    test_key = "test123"

    print("Before storing:")
    print(get_cache_result(test_key))

    set_cache_result(
        test_key,
        {"risk_level": "high"}
    )

    print("After storing:")
    print(get_cache_result(test_key))


    


    









