from django.urls import path
from .views import create_order, list_orders, order_detail, verify_payment

urlpatterns = [
    path('orders/create/', create_order, name='create-order'),
    path('orders/list/', list_orders, name='list-orders'),
    path('orders/<int:order_id>/', order_detail, name='order-detail'),
   
]
