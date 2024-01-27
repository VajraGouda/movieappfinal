import React, { useState } from 'react';

const Seat = (props) => {
    const { id, seat_number, category, price, is_reserved, theatre, movie } = props.data;

    const [isSelected, setIsSelected] = useState(false);

    const handleSeatClick = () => {
        setIsSelected(!isSelected);

        props.onSelect({
            seatId: seat_number,
            isSelected: !isSelected,
        });
    };

    const seatStyles = {
        backgroundColor: isSelected ? 'green' : (is_reserved ? 'grey' : 'white'),
        height: "55px",
        width: "55px",
        margin: "5px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #ddd",
    };


    return (
        <div
            className="seat"
            style={seatStyles}
            onClick={handleSeatClick}     >



            <p className="category" style={{ margin: "5px 0", textAlign: "center", fontSize: "10px" }}>{category}</p>
            <div className="seat-number" style={{ fontWeight: "bold", fontSize: "10px" }}>{seat_number}</div>
            <div className="seat-number" style={{ textAlign: "center", fontSize: "10px" }}>₹ {price}</div>
        </div>
    );
};
export default Seat;