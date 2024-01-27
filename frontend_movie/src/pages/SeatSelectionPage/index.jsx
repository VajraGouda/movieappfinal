import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Seat from './Seat';
import Navbar from '../../components/Navbar';

const SeatSelection = () => {
    const { movieId } = useParams();
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSeats, setSelectedSeats] = useState([]); // Add state for selected seats
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const seatsResponse = await axios.get(`http://127.0.0.1:8000/api/seats/${movieId}/`, config);
                console.log('Seats API Response:', seatsResponse.data);
                setSeats(seatsResponse.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSeats();
    }, [movieId]);

    const handleSeatSelect = ({ seatId, isSelected }) => {
        
        if (isSelected) {
            
            setSelectedSeats([...selectedSeats, seatId]);
        } else {
            
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        }
    };

    const handleBooking = async () => {
        try {

            console.log('Selected Seats:', selectedSeats);
            console.log('Movie ID:', movieId);
            const token = localStorage.getItem('access_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            
            const bookingResponse = await axios.post(
                'http://127.0.0.1:8000/api/bookings/create/',
                {
                    movie: movieId,
                    seats: selectedSeats,
                },
                config
            );

            
            console.log('Booking Response:', bookingResponse.data);

            setBookingDetails(bookingResponse.data);


            
            setSelectedSeats([]);
        } catch (error) {
            console.error('Booking Error:', error);
        }
    };

    const groupSeatsByRows = () => {
        const rows = [];

        for (let i = 0; i < seats.length; i += 5) {
            const currentRow = seats.slice(i, i + 5).map((seat) => (
                <Seat key={seat.id} data={seat} onSelect={handleSeatSelect} />
            ));

            rows.push(
                <div key={i} className="seat-row" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                    {currentRow}
                </div>
            );
        }

        return rows;
    };

    return (
        <>
            <Navbar />
            <div className="container" style={{
                display: "flex", flexDirection: "column", backgroundColor: "#FDDA0D",
                alignItems: "center", justifyContent: "center", height: "70vh", marginTop: "80px", perspective: "5000px"
            }}>
                <p>
                    You have Selected Seat Numbers<>:  </>  
                    {selectedSeats.length > 0 ? (
                        selectedSeats.map(seatNumber => (
                            <span key={seatNumber}>{seatNumber}, </span>
                        ))
                    ) : (
                        <span>No seats selected</span>
                    )}
                </p>

                <div className="seats-container" style={{ display: "inline", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
                    {groupSeatsByRows()}
                </div>

                <div className="main-container" style={{ display: "flex" }}>
                    <div className="seat-selected" style={{
                        backgroundColor: "green",
                        height: "30px",
                        width: "30px",
                        margin: "5px", 
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ddd", 
                    }}>S</div>

                    <div className="seat-occupied" style={{
                        backgroundColor: "grey",
                        height: "30px",
                        width: "30px",  
                        margin: "5px", 
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ddd", 
                    }}>O</div>
                </div>

                <p>Select a seat of your choice</p>
                <div className="screen" style={{
                    backgroundColor: "white",
                    height: "100px",
                    width: "70%",
                    margin: "15px",
                    textAlign: "center",
                    transform: "rotateX(60deg)",
                    boxShadow: "0 3px 10px rgb(255, 255, 255, 0.75)"
                }}></div>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleBooking} style={{ backgroundColor: "white", color: "black" }}>Pay and book Now</button>

                

            </div>

            {bookingDetails && (
                <div className="booking-summary" style={{ display: "flex", justifyContent: "center" }} >
                    <h5>Booking confirmed for amount : </h5>
                    
                    <h5> Rs. {bookingDetails.total_cost}/-</h5>
                    
                </div>
            )}
        </>
    );
};

export default SeatSelection;
