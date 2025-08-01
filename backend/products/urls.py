from django.urls import path
from . import views


urlpatterns = [
    path('products/', views.productsViewAndCreate, name='products'),
    path('products/<slug:slug>/', views.productDetailBySlug,
         name='product-detail-slug'),
]
