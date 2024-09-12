import json
from django.contrib.postgres.fields import ArrayField
from django.db import models
import uuid
from django.contrib.auth.models import User


class Tag(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='tags'
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='categories'
    )
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Note(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notes"
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='notes', null=True, blank=True
    )
    level = models.IntegerField(default=1)
    title = models.CharField(max_length=100)
    content = models.TextField()
    is_favorite = models.BooleanField(default=False)

    path = ArrayField(models.UUIDField(), default=list, blank=True)
    parent_note = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='children'
    )
    show_nested_notes = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    status = models.IntegerField(default=0)
    tags = models.ManyToManyField('Tag', blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        for child in self.children.all():
            child.delete()
        if self.parent_note:
            self.parent_note.children.remove(self)
            self.parent_note.save()

        super().delete(*args, **kwargs)


class Todo(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="todos"
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='todos', null=True, blank=True
    )
    level = models.IntegerField(default=1)
    title = models.CharField(max_length=100)
    todo_description = models.TextField()
    is_completed = models.BooleanField(default=False)

    path = ArrayField(models.UUIDField(), default=list, blank=True)
    parent_todo = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='children'
    )
    show_nested_todos = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    status = models.IntegerField(default=0)
    completed_level = models.DecimalField(
        max_digits=3, decimal_places=0, default=0)
    tags = models.ManyToManyField('Tag', blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_parent_status()

    def update_parent_status(self):
        if self.parent_todo:
            parent = self.parent_todo
            all_children_completed = all(
                child.is_completed for child in parent.children.all())
            parent.is_completed = all_children_completed
            parent.save()

    def delete(self, *args, **kwargs):
        for child in self.children.all():
            child.delete()
        if self.parent_note:
            self.parent_note.children.remove(self)
            self.parent_note.save()

        super().delete(*args, **kwargs)
