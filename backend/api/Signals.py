from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid
from django.contrib.auth.models import User
from .models import Category


@receiver(post_save, sender=User)
def create_default_categories(sender, instance, created, **kwargs):
    if created:
        default_categories = {
            str(uuid.uuid4()): {"name": "unsorted", "icon": "GrSort"},
            str(uuid.uuid4()): {"name": "favorites", "icon": "IoBookmarksSharp"},
            # str(uuid.uuid4()): {"name": "search-category", "icon": "IoBookmarksSharp"},
            str(uuid.uuid4()): {"name": "kanban", "icon": "BsKanban"},
            str(uuid.uuid4()): {"name": "trashcan", "icon": "FaRegTrashCan"},
        }

        for category_id, category_data in default_categories.items():
            Category.objects.create(
                owner=instance,
                name=category_data["name"],
                icon=category_data["icon"],
                id=category_id
            )
