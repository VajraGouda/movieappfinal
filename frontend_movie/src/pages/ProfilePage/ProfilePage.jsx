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

                setBookings(bookingsResponse.data);

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
                <ul style={{ display: "flex", margin: "50px" }}>

                    {bookings.map((booking, index) => (


                        <div className="col-md-4" key={booking.id}>

                            <div className={styles.wrapper}>
                                {movieTheatreDetails[index] && (
                                    <div>
                                        <img src={movieTheatreDetails[index].movie.image} alt={movieTheatreDetails[index].movie.title} />
                                        <h2>{movieTheatreDetails[index].movie.title}</h2>
                                        <h4 className={styles.author}>Theatre: {movieTheatreDetails[index].name}</h4>
                                    </div>
                                )}
                                <h4 className={styles.author}>Seats Booked: {booking.seats.join(', ')}</h4>
                                <h2 className={styles.author}>Total Cost: Rs. {booking.total_cost}/-</h2>
                                <h2 className={styles.author}>Booked at: {booking.booking_time}</h2>

                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ProfilePage;
