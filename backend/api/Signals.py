from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid
from django.contrib.auth.models import User
from .models import Category


@receiver(post_save, sender=User)
def create_default_categories(sender, instance, created, **kwargs):
    if created:
        default_categories = [
            {"name": "unsorted", "icon": "GrSort",
                "id": uuid.uuid4()},
            {"name": "favorites", "icon": "IoBookmarksSharp", "id": uuid.uuid4()},
            {"name": "kanban", "icon": "BsKanban", "id": uuid.uuid4()},
            {"name": "trashcan", "icon": "FaRegTrashCan", "id": uuid.uuid4()},
        ]

        for category_data in default_categories:
            Category.objects.create(
                owner=instance,
                name=category_data["name"],
                icon=category_data["icon"],
                id=category_data["id"]
            )
