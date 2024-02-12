import React, { useState } from 'react';
import '../../styles/MovieDetails.css';

function Reservation() {
    const rows = 8;
    const seatsPerRow = 5;

    // Initialize seat reservation state
    const [reservedSeats, setReservedSeats] = useState([]);

    // Function to handle seat click
    const handleSeatClick = (row, seat) => {
        const seatId = `${row}${seat}`;
        if (reservedSeats.includes(seatId)) {
            // If seat is already reserved, unreserve it
            setReservedSeats(reservedSeats.filter(reservedSeat => reservedSeat !== seatId));
        } else {
            // Otherwise, reserve the seat
            setReservedSeats([...reservedSeats, seatId]);
        }
    };

    const totalSeats = rows * seatsPerRow;
    const availableSeats = totalSeats - reservedSeats.length;

    const seatLayout = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
            row: String.fromCharCode(65 + rowIndex), // Convert to letters A-H
            seat: seatIndex + 1
        }))
    );

    return (
        <div className='main-wrapper'>
            <div className='movieDetails-wrapper'>
              <div className='movieDescription'>
                <div className='moviePoster'> 
                </div>
                <div className='movieTitle'>
                  <div className='title'>
                    <h1>Movie Title</h1>
                  </div>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error natus sequi dicta fuga sint beatae esse expedita at totam officiis, fugiat explicabo et eaque mollitia temporibus voluptatum, laboriosam nulla amet!</p>
                </div>
              </div>
                <div className='movieDetails'>
                  <h1>MOVIE DETAILS</h1>
                  <p>MPA FILM RATING: </p>
                  <p>CINEMA:</p>
                  <p>DURATION: </p>
                  <p>PRICE: </p>
                  <p>SHOWING TIME: </p>
                </div>
                <h1 style={{fontSize:'1em'}}>OTHER DETAILS</h1>
                <div className='otherDetails'>
                  <div className='legend'>
                  <h1>Legend</h1>
                  <div className='legend-item'>
                      <div className='legend-box available'></div>
                      <p className='legend-text'>Available Seats</p>
                  </div>
                  <div className='legend-item'>
                      <div className='legend-box unavailable'></div>
                      <p className='legend-text'>Unavailable Seats</p>
                  </div>
                  </div>
                  <div className='summary'>
                    <h1>Summary</h1>
                    <p>Total Seats: {totalSeats}</p>
                    <p>Available Seats: {availableSeats}</p>
                    <p>Reserved Seats: {reservedSeats.length}</p>
                  </div>
                </div>
            </div>
            <div className='seatLayout-wrapper'>
                <div className='header'>
                    <h1>Seat Reserved</h1>
                    <h1>View Reservation</h1>
                </div>
                <div className='screen'>
                    Front Screen
                </div>
                <div className="seat-layout">
                    {seatLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map(seat => (
                                <div
                                    key={`${seat.row}-${seat.seat}`}
                                    className={`seat ${reservedSeats.includes(`${seat.row}${seat.seat}`) ? 'reserved' : ''}`}
                                    onClick={() => handleSeatClick(seat.row, seat.seat)}
                                >
                                    {`${seat.row}${seat.seat}`}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className='entrance-exit-wrapper'>
                    <p className='entrance-exit'>Entrance</p>
                    <p className='entrance-exit'>Exit</p>
                </div>
                <div className='buttons'>
                    <button className='button1'>CANCEL</button>
                    <button className='button2'>RESERVE SEAT</button>
                </div>
            </div>
        </div>
    );
}

export default Reservation;
