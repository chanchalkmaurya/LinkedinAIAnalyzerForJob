from datetime import date


def format_partial_date(year, month=None, day=None):
    """
    Builds a display-friendly date string from separate year/month/day
    columns, since LinkedIn data often omits month or day.
    """
    if not year:
        return None

    if month and day:
        try:
            return date(year, month, day).isoformat()  # YYYY-MM-DD
        except ValueError:
            # invalid combination (e.g. Feb 30) — fall back to year-month
            pass

    if month:
        return f"{year:04d}-{month:02d}"  # YYYY-MM

    return f"{year:04d}"  # YYYY only
