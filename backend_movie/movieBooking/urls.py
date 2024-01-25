from django.urls import path
from .views import *


urlpatterns = [

    path("signup/", SignupView.as_view(), name="Signup-view"),#signup                                           
    path("login/", LoginView.as_view(), name="Login-view"),#login                                                
    path("userDetails/", UserDetailsView.as_view(), name="User-Details-view"), #displays and edits user detials  
    path("deactivate/", ActiveDeactive.as_view(), name="User-Details-view"), #deactivatesUseris_active to false  
    path("addmovie/", MovieView.as_view(), name="Add-Movie-view"), #post and get                                 
    path("spmovie/<int:id>", SpecificMovieView.as_view(), name="Add-Movie-view"), #get                                 
    path("editmovie/<int:id>/", MovieEditView.as_view(), name="Movie-Edit-view"), #put and delete                
    path("filter/", FilterViewMovie.as_view(), name="Filter-view"), #get                                         
    path('filter/movies/', FilterViewLocation.as_view(), name='filter-movies'),
    path('filter/movies/<str:city>', FilterViewLocation.as_view(), name='filter-movies-by-location'), #get      
    path("theatre/", TheatreView.as_view(), name="Theatre-view"), #post                                          
    path("theatre/<int:movie_id>/", TheatreDetailView.as_view(), name="Theatre-view"), #get                      
    path("seatsadd/", SeatAddView.as_view(), name='seat-update'), #add seats post                                
    path("seats/<int:movie_id>/", SeatListView.as_view(), name='seat-list'), #get seats for a specific movie    
    path("seats/reserve/", SeatReserveView.as_view(), name='seat-reserve'), #reserve seats post                  r
    path("seats/update/<int:seat_id>/", SeatUpdateView.as_view(), name='seat-update'), #put update booking       
    path('bookings/create/', BookingCreateView.as_view(), name='booking-create'), #post                          
    path('bookings/<int:booking_id>/', BookingDetailsView.as_view(), name='booking-details'), #get
    path('user-bookings/<int:user_id>/', UserBookingsView.as_view(), name='user-booking-details'), #get

]

