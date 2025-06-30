from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializers
from rest_framework.response import Response
# Create your views here.

@api_view(["GET"])
def productsView(request):
    products = Product.objects.all()
    serializer = ProductSerializers(products, many=True) #there will be many products
    return Response(serializer.data)


# before starting any project, make sure to customise user model before anything else
