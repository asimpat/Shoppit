import requests
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        order = serializer.save(user=request.user)
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(order)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    reference = request.data.get('reference')
    if not reference:
        return Response({'error': 'No payment reference provided'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        order = Order.objects.get(
            payment_reference=reference, user=request.user)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
    }
    url = f"https://api.paystack.co/transaction/verify/{reference}"
    r = requests.get(url, headers=headers)
    result = r.json()

    if result['status'] and result['data']['status'] == 'success':
        order.status = 'paid'
        order.save()
        return Response({'message': 'Payment verified and order updated!'})
    else:
        return Response({'error': 'Payment not verified'}, status=status.HTTP_400_BAD_REQUEST)
