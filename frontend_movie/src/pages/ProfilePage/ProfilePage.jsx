import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../../components/Navbar';
import tomato from './tomato.png';
import styles from './styles.module.css';


const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState({});
    const [bookings, setBookings] = useState([]);
    const [movieTheatreDetails, setMovieTheatreDetails] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const accessToken = localStorage.getItem('access_token');


                const userDetailsResponse = await axios.get('http://127.0.0.1:8000/api/userDetails/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });


                setUserDetails(userDetailsResponse.data);


                const decodedToken = jwtDecode(accessToken);
                localStorage.setItem("user_id", decodedToken.user_id);
                // const userId = decodedToken.sub;
                console.log('User ID:', decodedToken.user_id);


                const bookingsResponse = await axios.get(`http://127.0.0.1:8000/api/user-bookings/${decodedToken.user_id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setBookings(bookingsResponse.data.map(booking => ({
                    ...booking,
                    
                    seatNumbers: booking.seats.join(', '),
                })))

                const movieDetailsPromises = bookings.map(async (booking) => {
                    const movieId = booking.movie;



                    const movieTheatreDetailsResponse = await axios.get(`http://127.0.0.1:8000/api/theatre/${movieId}/`);
                    return movieTheatreDetailsResponse.data;
                });

                const movieTheatreDetails = await Promise.all(movieDetailsPromises);
                setMovieTheatreDetails(movieTheatreDetails);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };



        fetchUserData();
    }, [bookings]);



    return (

        <>
            <Navbar />
            <div>
                <h2 style={{ display: "flex", justifyContent: "center", margin: "50px" }}>Welcome, <a style={{ fontWeight: "bold" }}>{userDetails.name}</a></h2>

                <h3 style={{ display: "flex", justifyContent: "center", margin: "50px" }}>Your Bookings</h3>
                <div className="row" style={{ display: "flex", margin: "50px" }}>

                    {bookings.map((booking, index) => (


                        <div className="col-md-4" key={booking.id}>

                            <div className={styles.wrapper}>
                                {movieTheatreDetails[index] && (
                                    <div>
                                        <img src={movieTheatreDetails[index].movie.image} alt={movieTheatreDetails[index].movie.title} />
                                        <h2>{movieTheatreDetails[index].movie.title}</h2>
                                        <h4 className={styles.author}>Theatre: {movieTheatreDetails[index].name}</h4>
                                        <h4 className={styles.author}>Show Time: 12:15 PM</h4>
                                    </div>
                                )}
                                <h4 className={styles.author}>Seats Booked: {booking.seatNumbers}</h4>
                                <h2 className={styles.author}>Total Cost: Rs. {booking.total_cost}/-</h2>
                                <a style={{ color: "#888", fontSize: "18px" }}>Booked at: {new Date(booking.booking_time).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</a>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
