from django.urls import path
from .views import create_order

urlpatterns = [
    path('orders/create/', create_order, name='create-order'),
]
