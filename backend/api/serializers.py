from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category, Note, Todo, Tag


class UserSerialaizer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", 'username', "password"]
        extra_kwargs = {"password": {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "icon"]
        extra_kwargs = {"owner": {"read_only": True}}

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['owner'] = user
        return super().create(validated_data)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]
        extra_kwargs = {"owner": {"read_only": True}}


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["category", "id", "level", "title", "content", "is_favorite",
                  "show_nested_notes", "tags", "created_at", "last_modified_at", "status", "parent_note"]
        extra_kwargs = {"owner": {"read_only": True}}


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["category", "id", "level", "title", "todo_description", "is_completed ",
                  "show_nested_todos", "tags", "created_at", "last_modified_at", "status", "parent_note"]
        extra_kwargs = {"owner": {"read_only": True}}
