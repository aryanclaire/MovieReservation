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
    // GET THE DATA FROM URL
    const movieId = window.location.pathname.split('/')[2];    

    // INITIALIZE THE DATA
    const [movie, setMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    // EVENT FUNCTIONS
    const handleSeatClick = (seatId) => {
        setSelectedSeats([...selectedSeats, seatId]); // Push the clicked seatId into the selectedSeats array
    };

    // REQUEST SPECIFIC MOVIES BY ID
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

// RENDER SEATS IN GRID FROMAT
const renderSeats = () => {
    if (!movie || !movie.m_seat) return null;

    // MAKING 2D ARRAY
    const rows = [];
    let row = [];
    movie.m_seat.forEach((seat, index) => {
        const isSeatSelected = selectedSeats.includes(seat.position); // Check if seat is selected

        row.push(
            <Box
                key={seat._id}
                style={{ textAlign: 'center', cursor: seat.is_occupied ? 'not-allowed' : 'pointer' }}
                onClick={!seat.is_occupied ? () => handleSeatClick(seat.position) : null} // Call handleSeatClick on click if seat is not occupied
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

    return (
        <Box>
            <Box className="movie-cont" style={{ display: 'flex', justifyContent:'space-between' }}>
                <MovieDetail className="movie-details" style={{ width: '55%' }}>
                    <Box style={{ display: 'flex', justifyContent:'space-between'}}>
                        {/* DISPLAY MOVIE, DETAILS AND LEGEND */}
                        <MovieImage className="movie-image" style={{ width: '50%' }}>
                            <Box className="movie-image" style={{ width: '20%' }}>
                                {movie && (
                                    <img src={`/${movie.m_poster}`} alt={movie.m_title} style={{ width: '300px', height: '400px' }} />
                                )}                            
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
                            <MoreDetails variant='subtitle1'><b>DURATION: </b>  {movie?.m_hrs} mins</MoreDetails>
                            <MoreDetails variant='subtitle1'><b>TYPE: </b> {movie?.m_type.toUpperCase()} </MoreDetails>
                            <MoreDetails variant='subtitle1'><b>PRICE: </b>  ₱{movie?.m_price.toFixed(2)} </MoreDetails>
                        </Box>
                    </Box>
                    <Box>
                        <Box style={{ display: 'flex', justifyContent: 'space-between'}} >

                            {/* COMMENT OUT -- THIS FOR THE MEAN TIME  */}
                            <Box className="summary">
                                <Typography variant='h6' style={{ marginTop: '15px', marginBottom: '15px'}} ><b>SEAT SUMMARY</b></Typography>
                                <SummaryTypography > Available Seats: 30</SummaryTypography>
                                <SummaryTypography > Reserved Seats: 10</SummaryTypography>
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

                {/*  {/* DISPLAY THE SEAT LAYOUT */} 
                <Box className="seat-details" style={{ width: '40%', background:'#fff', borderRadius: '10px', textAlign: 'center', padding: '25px' }}>
                    <Typography></Typography>
                    <Box mb={2}>SCREEN</Box>
                    <Box style={{ width: '400px', margin: '0 auto' }}>
                        {renderSeats()}
                    </Box>
                    <Box style={{display: 'flex', justifyContent: 'space-between', marginTop: "2px"}}>
                        <Box>EXIT</Box> <Box>ENTRANCE</Box>
                    </Box>
        
                    <Box>
                        <Button 
                            variant="outlined"  
                            component={Link} 
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
