from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Product
from .serializers import ProductSerializers


@api_view(['GET', 'POST'])
# Anyone can GET, only authenticated can POST
@permission_classes([permissions.IsAuthenticatedOrReadOnly])
def productsViewAndCreate(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializers(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# before starting any project, make sure to customise user model before anything else
