from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductSerializers


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializers(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id',
                  'quantity', 'total_price', 'added_at']
        read_only_fields = ['id', 'added_at']

    def get_total_price(self, obj):
        return obj.get_total_price()

    def validate_quantity(self, value):
        """Validate that quantity is positive"""
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than 0")
        return value


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price',
                  'total_items', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_total_price(self, obj):
        return obj.get_total_price()

    def get_total_items(self, obj):
        return obj.get_total_items()
