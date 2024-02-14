import React from 'react';
import styled from "@emotion/styled";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const StyledImage = styled('img')({
  width: '30px',
  padding: '20px' // Removed background color
});

const MPATypography = styled(Typography)({
  padding: '6px',
  background: '#000',
  color: '#fff',
  marginRight: '15px',
  width: '70px',
  alignContent: 'center',
  textAlign: 'center'
});

const MovieDetails = styled(Box)({
  marginTop: '10px'
});

const MoreTypography = styled(Typography)({
  marginTop: '10px'
});

const StyledPaper = styled(Paper)({
  maxHeight: 450,
  overflow: 'auto',
  backgroundColor: 'transparent', // Set background color to transparent
  boxShadow: 'none', // Remove box shadow
  '&::-webkit-scrollbar': {
    width: '0.4rem' // Adjust scrollbar width as needed
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc', // Adjust scrollbar thumb color as needed
    borderRadius: '4px' // Adjust scrollbar thumb border radius as needed
  }
});

const SelectMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5555/api/movies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home">
      <h2>Home</h2>
      <Box className="movies-cont" style={{ display: 'flex' }}>
        <Box className="movie-list" style={{ width: '75%' }}>
          <StyledPaper>
            {/* Map the movies here */}
            {movies.map(movie => (
              <React.Fragment key={movie.m_title}>
                <Divider />
                <Box className="movie" style={{ display: 'flex', marginBottom: '20px' }}>
                  <Box className="movie-image" style={{ width: '20%' }}>
                    <StyledImage src={movie.m_poster} alt={movie.m_title} />
                  </Box>
                  <Box className="movie-detail" style={{ width: '80%' }}>
                    <Box style={{ display: 'flex' }}>
                      <MPATypography>{movie.m_mpa}</MPATypography>
                      <Typography variant="h6">{movie.m_title}</Typography>
                    </Box>
                    <MovieDetails>{movie.m_desc}</MovieDetails>
                    <MoreTypography>
                      Cinema: {movie.m_cinema} | Date: {new Date(movie.m_date).toLocaleDateString()} | Duration: {movie.m_hrs} hrs | Start time: {new Date(movie.m_starttime).toLocaleTimeString()} - End time: {new Date(movie.m_endtime).toLocaleTimeString()}
                    </MoreTypography>
                    <Box>
                      <Button component={Link} to={`/movies/${movie._id}`}>More Details</Button>
                    </Box>
                  </Box>
                </Box>
              </React.Fragment>
            ))}
          </StyledPaper>
        </Box>
        <Box className="movie-option" style={{ width: '25%' }}>
          {/* Additional movie options can be added here */}
        </Box>
      </Box>
    </div>
  );
}

export default SelectMovies;
