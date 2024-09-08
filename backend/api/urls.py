from django.urls import path
from . import views


urlpatterns = [
    path("categories/", views.CategoryListCreate.as_view(), name="category-list"),
    path("categories/delete/<uuid:pk>",
         views.CategoryDelete.as_view(), name="delete-notes"),
    path("categories/<uuid:pk>/", views.CategoryDetailModify.as_view(),
         name="category-detail-modify")
]
