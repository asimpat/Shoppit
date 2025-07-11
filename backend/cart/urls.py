from django.urls import path
from . import views


urlpatterns = [
    path('cart/', views.view_cart, name='view-cart'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('cart/update/<int:item_id>/',
         views.update_cart_item, name='update-cart-item'),
    path('cart/remove/<int:item_id>/',
         views.remove_from_cart, name='remove-from-cart'),
    path('cart/clear/', views.clear_cart, name='clear-cart'),
]
