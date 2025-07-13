from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    profilePicture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password',
            'firstName', 'lastName',
            'city', 'state', 'address',
            'phone', 'profilePicture'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'firstName',
                  'lastName', 'city', 'state', 'address', 'phone', 'profilePicture']
        read_only_fields = ['id', 'email']  # Can not be changed after creation


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
