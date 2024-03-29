// Inside Reservation component
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { Link } from 'react-router-dom';


import React, { useEffect, useState } from 'react';
import '../../styles/MovieDetails.css';
import { Box, Button, Divider, Typography } from '@mui/material';
import styled from '@emotion/styled';

const MovieDetail = styled(Box)({
    borderRadius: '10px',
    padding: '25px'
});

const MovieImage = styled(Box)({
   
});

const MoreDetails = styled(Typography)({
    display: 'flex',
    marginTop: '5px',
});

const LegendBox = styled(Box)({
    height: '30px',
    width: '30px',
    padding: '5px',
    marginRight: '10px',
    marginBottom: '10px'
});

const Legend = styled(Box)({
    display: 'flex',
    marginTop: '5px'
});

const SummaryTypography = styled(Typography)({
    marginBottom: '5px'
});

function Reservation() {
    const movieId = window.location.pathname.split('/')[2];    // Get the dynamic part of the URL
    const [movie, setMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectAll, setSelectAll] = useState(false);      // State to track whether all seats are selected

    const handleSeatClick = (seatId) => {
        setSelectedSeats((prevSelectedSeats) => {
            const isSeatSelected = prevSelectedSeats.includes(seatId);
    
            if (isSeatSelected) {
                // If seat is already selected, remove it
                return prevSelectedSeats.filter((seat) => seat !== seatId);
            } else {
                // If seat is not selected, add it
                return [...prevSelectedSeats, seatId];
            }
        });
    };
    const availableSeats = movie ? movie.m_seat.length - selectedSeats.length : 0;
    
    const reservedSeats = selectedSeats.length;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/movies/${movieId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [movieId]); // Ensure useEffect runs when movieId changes

    // Function to render the seats in a grid format
    // Function to render the seats in a grid format
    const renderSeats = () => {
        if (!movie || !movie.m_seat) return null;

        const rows = [];
        let row = [];

        movie.m_seat.forEach((seat, index) => {
            const isSeatSelected = selectedSeats.includes(seat.position); // Check if seat is selected

            row.push(
                <Box
                    key={seat._id}
                    style={{ textAlign: 'center', cursor: seat.is_occupied ? 'not-allowed' : 'pointer' }}
                    onClick={!seat.is_occupied ? () => handleSeatClick(seat.position) : () => handleSeatClick(seat.position)} // Always call handleSeatClick on click
                >
                    <div style={{ color: seat.is_occupied ? '#f57c00' : (isSeatSelected ? '#0288d1' : '#388e3c'), fontWeight: isSeatSelected ? 'bold' : 'normal' }}>
                        <EventSeatIcon style={{ fontSize: '40px', marginBottom: '-20px' }} />
                    </div>
                    <Typography variant='overline' style={{ color: !seat.is_occupied && isSeatSelected ? '#0288d1' : seat.is_occupied ? '#f57c00' : '#388e3c', fontWeight: isSeatSelected ? 'bold' : 'normal' }}>{seat.position}</Typography>
                </Box>
            );

            // Add the row to rows array when 5 seats are added or it's the last seat
            if ((index + 1) % 5 === 0 || index === movie.m_seat.length - 1) {
                rows.push(
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {row}
                    </div>
                );
                row = [];
            }
        });

        return rows;
    };
    useEffect(() => {
        console.log(selectedSeats); 
    }, [selectedSeats]);

    // Function to handle clicking on the "Select All Seats" button
    const handleSelectAllSeats = () => {
        if (selectAll) {
            // If all seats are already selected, unselect all seats
            setSelectedSeats([]);
            setSelectAll(false);
        } else {
            // If all seats are not selected, select all seats
            const newSelectedSeats = movie.m_seat
                .filter(seat => !seat.is_occupied)
                .map(seat => seat.position);

            setSelectedSeats(newSelectedSeats);
            setSelectAll(true);
        }
    };

    return (
        <Box>
            <Box className="movie-cont" style={{ display: 'flex', justifyContent:'space-between' }}>
                <MovieDetail className="movie-details" style={{ width: '55%' }}>
                    <Box style={{ display: 'flex', justifyContent:'space-between'}}>
                        <MovieImage className="movie-image" style={{ width: '50%' }}>
                            <Box className="movie-image" style={{ width: '20%' }}>
                                <img src='/avatar.jpg' alt="{movie.m_title}" style={{ width: '300px', height: '400px' }} />
                            </Box>
                        </MovieImage>
                        <Box className="main-details" style={{ width: '45%' }}>
                            <Typography variant='h5'><b>{movie?.m_title}</b></Typography>
                            <Divider style={{background:'#0D99FF', marginTop: '10px' }}/>
                            <Typography variant='body2' style={{marginTop:'10px' }}>{movie?.m_desc}</Typography>
                            <MoreDetails variant='subtitle1'><b>CINEMA: </b> {movie?.m_cinema}</MoreDetails>
                            <MoreDetails variant='subtitle1'><b>MPA FILM RATING: </b> {movie?.m_cinema}</MoreDetails>
                            <MoreDetails variant='subtitle1'><b>DATE: </b> {new Date(movie?.m_date).toLocaleDateString()}</MoreDetails>
                            <MoreDetails variant='subtitle1'><b>TIME: </b> {new Date(movie?.m_starttime).toLocaleTimeString()} -  {new Date(movie?.m_endtime).toLocaleTimeString()}</MoreDetails>
                            <MoreDetails variant='subtitle1'><b>DURATION: </b>  {movie?.m_hrs} hrs</MoreDetails>
                            <MoreDetails variant='subtitle1'><b>TYPE: </b> {movie?.m_type.toUpperCase()} </MoreDetails>
                            <MoreDetails variant='subtitle1'><b>PRICE: </b>  ₱{movie?.m_price.toFixed(2)} </MoreDetails>
                        </Box>
                    </Box>
                    <Box>
                        <Box style={{ display: 'flex', justifyContent: 'space-between'}} >
                            <Box className="summary">
                                <Typography variant='h6' style={{ marginTop: '15px', marginBottom: '15px'}} ><b>SEAT SUMMARY</b></Typography>
                                <SummaryTypography > Available Seats: {availableSeats}</SummaryTypography>
                                <SummaryTypography > Reserved Seats: {reservedSeats}</SummaryTypography>
                                <Divider style={{background:'#0D99FF', marginTop: '10px' }}/>
                                <SummaryTypography  style={{ marginTop: '10px'}}> Total Number of Seats: 40</SummaryTypography>
                            </Box>
                            <Box className="legend">
                                <Typography variant='h6' style={{ marginTop: '15px', marginBottom: '15px'}} ><b>LEGEND</b></Typography>
                                <Legend >
                                    <LegendBox style={{background:'#388e3c'}}></LegendBox>
                                    <Typography>Available Seats</Typography>
                                </Legend>
                                <Legend >
                                    <LegendBox style={{background:'#f57c00'}}></LegendBox>
                                    <Typography>Unvailable Seats </Typography>
                                </Legend>
                                <Legend >
                                    <LegendBox style={{background:'#0288d1'}}></LegendBox>
                                    <Typography>Selected Seats </Typography>
                                </Legend>
                            </Box>
                        </Box>
                    </Box>
                </MovieDetail>
                {/* this is the seat */}
                <Box className="seat-details" style={{ width: '40%', background:'#fff', borderRadius: '10px', textAlign: 'center', padding: '25px' }}>
                    <Typography>Screen</Typography>
                    <Box style={{ width: '400px', margin: '0 auto' }}>
                        {renderSeats()}
                    </Box>
                    <Box>
                        {/* Button to select all seats */}
                        <Button
                            variant="outlined"
                            onClick={handleSelectAllSeats}
                            style={{ width: '100%', marginTop: '30px' }}
                        >
                            {selectAll ? 'Unselect All Seats' : 'Select All Seats'}
                        </Button>
                    </Box>
                    <Box>
                        <Button 
                            variant="outlined"  
                            component={Link} 
                            //to={`/details/${movieId}`} 
                            // to={{
                            //     pathname: `/details/${movieId}`,    
                            //     state: { selectedSeats: selectedSeats } // Pass selected seats as state
                            // }}
                            to={`/details/${movieId}${selectedSeats.length > 0 ? `/${JSON.stringify(selectedSeats)}` : ''}`}
                            style={{ width: '100%', marginTop: '30px' }}
                        >
                            Proceed to Reservation
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Reservation;
