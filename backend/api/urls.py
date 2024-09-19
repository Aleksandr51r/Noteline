from django.urls import path
from . import views


urlpatterns = [
    path("categories/", views.CategoryListCreate.as_view(), name="category-list"),
    path("categories/delete/<uuid:pk>",views.CategoryDelete.as_view(), name="delete-notes"),
    path("categories/<uuid:pk>/", views.CategoryDetailModify.as_view(),name="category-detail-modify"),
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/<uuid:pk>/", views.NoteDetailModify.as_view(),name="note-detail-modify"),
]
