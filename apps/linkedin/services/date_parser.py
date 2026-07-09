# apps/linkedin/services/date_parser.py

from typing import Any


def parse_date(date_data: dict | None) -> dict[str, Any]:
    """
    Convert EnrichLayer date object into normalized dictionary.

    Input:
    {
        "day": 1,
        "month": 6,
        "year": 2024
    }

    Output:
    {
        "day": 1,
        "month": 6,
        "year": 2024
    }
    """

    if not date_data:
        return {
            "day": None,
            "month": None,
            "year": None,
        }

    return {
        "day": date_data.get("day"),
        "month": date_data.get("month"),
        "year": date_data.get("year"),
    }


def parse_date_range(
    starts_at: dict | None,
    ends_at: dict | None,
) -> dict[str, Any]:
    """
    Normalize EnrichLayer date range.

    Returns:

    {
        "start_day": ...,
        "start_month": ...,
        "start_year": ...,
        "end_day": ...,
        "end_month": ...,
        "end_year": ...
    }
    """

    start = parse_date(starts_at)
    end = parse_date(ends_at)

    return {
        "start_day": start["day"],
        "start_month": start["month"],
        "start_year": start["year"],
        "end_day": end["day"],
        "end_month": end["month"],
        "end_year": end["year"],
    }