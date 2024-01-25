from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate


class UserSearializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["name", "username", "password", "email"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            name=validated_data["name"],
            password=validated_data["password"],
            email=validated_data["email"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user:
            return user
        raise serializers.ValidationError(
            "Username or password does not match")
    
    
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'email', 'username')


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"


class TheatreSerializer(serializers.ModelSerializer):
    movie = MovieSerializer()

    class Meta:
        model = Theatre
        fields = '__all__' 
       

    def create(self, validated_data):
        movie_data = validated_data.pop('movie')
        movie = Movie.objects.create(**movie_data)
        theatre = Theatre.objects.create(movie=movie, **validated_data)
        return theatre
    
class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = "__all__"


    
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

    def create(self, validated_data):
        seats_data = validated_data.pop('seats', [])
        print(seats_data)

        if not all(isinstance(seat, Seat) for seat in seats_data):
            raise serializers.ValidationError("Invalid seat data")

        total_cost = sum(seat.price for seat in seats_data)
        validated_data['total_cost'] = total_cost

        booking = Booking.objects.create(**validated_data)
        booking.seats.set(seats_data)

        return booking

