from .models import Movie
from .serializers import MovieSerializer
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from .serializers import UserSearializer
from django.core.paginator import Paginator
from django.db.models import Q, Avg, Sum
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import isAdminMovie
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


class SignupView(APIView):
    def post(self, request):
        data = request.data
        serializer = UserSearializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created successfully"}, status=201)
        return Response(serializer.errors, status=400)


class LoginView(APIView):
    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = RefreshToken.for_user(user)
            return Response({"message": "Login successfull", "access_token": str(token.access_token), "refresh_token": str(token), })
        return Response(serializer.errors, status=401)


class UserDetailsView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSearializer

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return UpdateUserSerializer
        return UserSearializer


class ActiveDeactive(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        user.is_active = not user.is_active
        user.save()
        return Response({'message': 'User active status toggled successfully'}, status=200)


class MovieView(APIView):
    permission_classes = [isAdminMovie]

    def post(self, request):  # admin
        data = request.data
        serializer = MovieSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Movie added"}, status=201)
        return Response(serializer.errors, status=400)

    def get(self, request):  # all
        self.check_permissions(request)
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True).data
        return Response(serializer)


class SpecificMovieView(APIView):
    def get(self, request, id):
        try:
            movie = Movie.objects.get(id=id)
            serializer = MovieSerializer(movie).data
            return Response(serializer, status=200)
        except:
            return Response({"msg": "movie not found"}, status=404)


class MovieEditView(APIView):
    permission_classes = [isAdminMovie]

    def put(self, request, id, *args, **kwargs):  # admin
        try:
            movie = Movie.objects.get(pk=id)
        except Movie.DoesNotExist:
            return Response({'error': 'Movie not found'}, status=404)

        serializer = MovieSerializer(movie, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete(self, request, id):  # admin
        try:
            item = Movie.objects.get(pk=id)
        except Movie.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)

        try:
            item.delete()
            return Response({'message': 'Item deleted successfully'}, status=204)
        except Exception as e:
            return Response({'error': str(e)}, status=500)


class FilterViewMovie(APIView):
    def get(self, request):
        title = request.GET.get("title", None)
        genre = request.GET.get("gen", None)
        language = request.GET.get("lang", None)
        minRating = request.GET.get("min", None)

        movies = Movie.objects.all()
        if title:
            movies = movies.filter(title__icontains=title)
        if genre:
            movies = movies.filter(genre__icontains=genre)
        if language:
            movies = movies.filter(language__iexact=language)
        if minRating:
            movies = movies.filter(rating__gt=float(minRating))

        serializer = MovieSerializer(movies, many=True).data
        return Response(serializer, status=200)


class TheatreView(APIView):
    permission_classes = [isAdminMovie]

    def post(self, request):  # admin
        data = request.data
        serializer = TheatreSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Theatre added"}, status=201)
        return Response(serializer.errors, status=400)




class FilterViewLocation(APIView):
    def get(self, request, city=None):
        title = request.GET.get("title", None)
        genre = request.GET.get("gen", None)
        language = request.GET.get("lang", None)
        minRating = request.GET.get("min", None)

        movies = Movie.objects.all()

        if city:
            movies = movies.filter(theatres__city__iexact=city)

        
        if title or genre or language or minRating:
            if title:
                movies = movies.filter(title__icontains=title)
            if genre:
                movies = movies.filter(genre__icontains=genre)
            if language:
                movies = movies.filter(language__iexact=language)
            if minRating:
                movies = movies.filter(rating__gt=float(minRating))

        serializer = MovieSerializer(movies, many=True).data
        return Response(serializer, status=200)


class SeatAddView(APIView):
    permission_classes = [isAdminMovie]

    def post(self, request):  # admin
        serializer = SeatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class SeatListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, movie_id):
        seats = Seat.objects.filter(movie_id=movie_id)
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data)


class SeatReserveView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SeatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class SeatUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, seat_id):
        seat = Seat.objects.get(pk=seat_id)
        serializer = SeatSerializer(seat, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    

class BookingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "User not authenticated"}, status=400)

        movie_id = request.data.get('movie')
        seat_numbers = request.data.get('seats', [])

        seats = Seat.objects.filter(movie=movie_id, seat_number__in=seat_numbers)

        if len(seats) != len(seat_numbers):
            return Response({"error": "Invalid seat data"}, status=400)

        total_cost = sum(seat.price for seat in seats)

        booking_data = {
            'user': request.user.id,
            'movie': movie_id,
            'seats': [seat.id for seat in seats], 
            'total_cost': total_cost,
        }

        serializer = BookingSerializer(data=booking_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)




class BookingDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id)
            serializer = BookingSerializer(booking)
            return Response(serializer.data)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=404)


class TheatreDetailView(APIView):
    def get(self, request, movie_id):
        theatre = get_object_or_404(Theatre, movie__id=movie_id)
        serializer = TheatreSerializer(theatre)
        return Response(serializer.data, status=200)

class UserBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        bookings = Booking.objects.filter(user_id=user_id)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=200)