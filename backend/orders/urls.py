from django.urls import path
from .views import create_order, list_orders, order_detail, create_paystack_checkout_session, payment_success, payment_failed

urlpatterns = [
    path('orders/create/', create_order, name='create-order'),
    path('orders/list/', list_orders, name='list-orders'),
    path('orders/<int:order_id>/', order_detail, name='order-detail'),
    path('orders/checkout/<int:product_id>/',
         create_paystack_checkout_session, name='checkout-product'),
    path('payment-success/<int:product_id>/',
         payment_success, name='payment-success'),
    path('payment-failed/<int:product_id>/',
         payment_failed, name='payment-failed'),
]

