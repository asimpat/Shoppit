from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    """View user's cart with all items"""
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    """Add a product to cart or update quantity if already exists"""
    serializer = CartItemSerializer(data=request.data)
    if serializer.is_valid():
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']
        
        # Get or create cart for user
        cart, created = Cart.objects.get_or_create(user=request.user)
        
        # Check if product exists
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if item already exists in cart
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            # Item already exists, update quantity
            cart_item.quantity += quantity
            cart_item.save()
        
        # Return updated cart
        cart_serializer = CartSerializer(cart)
        return Response({
            "message": "Item added to cart successfully",
            "cart": cart_serializer.data
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    """Update quantity of a specific cart item"""
    try:
        cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = CartItemSerializer(cart_item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        cart_serializer = CartSerializer(cart_item.cart)
        return Response({
            "message": "Cart item updated successfully",
            "cart": cart_serializer.data
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, item_id):
    """Remove a specific item from cart"""
    try:
        cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
    
    cart = cart_item.cart
    cart_item.delete()
    
    cart_serializer = CartSerializer(cart)
    return Response({
        "message": "Item removed from cart successfully",
        "cart": cart_serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    """Remove all items from user's cart"""
    try:
        cart = Cart.objects.get(user=request.user)
        cart.items.all().delete()
        return Response({"message": "Cart cleared successfully"}, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
