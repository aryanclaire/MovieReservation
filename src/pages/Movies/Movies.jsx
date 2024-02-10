import React from 'react';
import '../../styles/MovieDetails.css';
// import dan from '../../dan.jpg';



function Movies() {

    const rows = 8;
    const seatsPerRow = 5;
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
                <div className='moviePoster'> {/*DASD*/}
                {/* <img src={dan}/> */}
                </div>
                <div className='movieTitle'>
                <h1>Movie Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error natus sequi dicta fuga sint beatae esse expedita at totam officiis, fugiat explicabo et eaque mollitia temporibus voluptatum, laboriosam nulla amet!</p>
                </div>
                <div className='movieDetails'>
                        <ul>MPA FILM RATING: </ul>
                        <ul>CINEMA: </ul>
                        <ul>DURATION: </ul>
                        <ul>PRICE: </ul>
                        <ul>SHOWING TIME: </ul>
                </div>
            </div>
        </div>
        <div className='seatLayout-wrapper'>
            <div className='header'>
            <h1>Seat Reserved</h1>
            <h2>View Reservation</h2>
            </div>
            <div className='screen'>
                Front Screen
            </div>
            <div className="seat-layout">
             {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
            {row.map(seat => (
                <div key={`${seat.row}-${seat.seat}`} className="seat">
                {`${seat.row}${seat.seat}`} {/* Concatenate row letter with seat number */}
                </div>
            ))}
            </div>
        ))}
        </div>


        </div>
    </div>
  )
}

export default Movies