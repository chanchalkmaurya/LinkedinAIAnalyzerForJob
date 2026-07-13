class EnrichLayerException(Exception):
    """Base exception for EnrichLayer errors."""


class EnrichLayerAPIException(EnrichLayerException):
    """Raised when EnrichLayer returns an API error."""


class EnrichLayerTimeoutException(EnrichLayerException):
    """Raised when request times out."""


class EnrichLayerResponseException(EnrichLayerException):
    """Raised when response format is invalid."""
