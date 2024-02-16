import React from 'react';
import styled from "@emotion/styled";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const StyledImage = styled(Box)({
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

const MovieItem = ({ movie }) => {
  return (
    <React.Fragment key={movie.m_title}>
      <Divider />
      <Box className="movie" style={{ display: 'flex', marginBottom: '20px' }}>
      <Box className="movie-image" style={{ width: '20%' }}>
      <img src={`/${movie.m_poster}`}  alt="{movie.m_title}" style={{ width: '150px', height: '200px' }} />
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
  );
}

export default MovieItem;
