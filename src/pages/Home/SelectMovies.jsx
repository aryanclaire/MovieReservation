import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import MovieItem from './MovieItem';

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
  const [dateShow, setDateShow] = useState('');
  const [moviesDate, setMoviesDate] = useState([]);
  const [moviesDateErr, setMoviesDateErr] = useState("");

  const currentDate = new Date().toLocaleDateString('en-CA');
  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:5555/api/movies/date/${currentDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setMoviesDateErr(error);
      }
    };

    fetchMovies();
  }, []);

  const handleDateShowChange = (event) => { // handle datechange
    setDateShow(event.target.value);
  };

  const handleSelectMovie = async () => {
    try {
      const response = await fetch(`http://localhost:5555/api/movies/date/${dateShow}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies by date');
      }
      const data = await response.json(); // Parse JSON data from response
      setMovies(data); // Update movies state with parsed data
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="home">
      <h2>List of Movies </h2> 
      <Box className="movies-cont" style={{ display: 'flex' }}>
        <Box className="movie-list" style={{ width: '75%' }}>
          <StyledPaper>
          {movies.length === 0 ? (
            <Typography>No movies available</Typography>
          ) : (
            movies.map(movie => (
              <MovieItem key={movie._id} movie={movie}/>
            ))
          )}
          </StyledPaper>
        </Box>
        <Box className="movie-option" style={{ width: '25%', paddingLeft: '15px' }}>
          
          {/* select date */}
          <Box style={{ padding: '20px 15px', background: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            {/* date of the show */}
            <TextField
              id="date"
              label="Select Date"
              type="date"
              value={dateShow}
              onChange={handleDateShowChange}
              InputLabelProps={{
                shrink: true,
              }}
              style={{width:'100%'}}
            />

          </Box>
          
          <Box>
              <Button variant="outlined" onClick={handleSelectMovie} style={{ width: '100%', marginTop: '30px', background:'#000', color:'#fff' }}>
                  Select Movie
              </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default SelectMovies;
