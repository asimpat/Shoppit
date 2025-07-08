from rest_framework import serializers
from .models import Product


class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "description",
                  "price", "image", "category"]


class DetailedProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "slug", "description",
                  "price", "image", "category", "similar_products"]

    def get_similar_products(self, product):
        products = Product.objects.filter(
            category=product.category).exclude(id=product.id)
        serializer = ProductSerializers(
            products, many=True, context=self.context)
        return serializer.data
