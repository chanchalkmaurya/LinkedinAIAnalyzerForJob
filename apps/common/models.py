from django.db import models


class TimeStampedModel(models.Model):
    """
    Adds created_at and updated_at to every model.
    """

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        abstract = True


class UUIDModel(models.Model):
    """
    Every public object gets a UUID.
    """

    import uuid

    uuid = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True,
        db_index=True,
    )

    class Meta:
        abstract = True


class BaseModel(TimeStampedModel, UUIDModel):
    """
    Base class inherited by every table.
    """

    class Meta:
        abstract = True
        
        
        
from django.db import models


class DateRangeMixin(models.Model):
    """
    Stores partial dates returned by EnrichLayer.
    """

    start_day = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
    )

    start_month = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
    )

    start_year = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        db_index=True,
    )

    end_day = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
    )

    end_month = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
    )

    end_year = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        db_index=True,
    )

    class Meta:
        abstract = True