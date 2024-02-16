import React from 'react'
import { Box, Typography } from '@mui/material';
import MovieTable from './MovieTable';
import Backup from './Backup';

export default function ReservationList() {
  return (
    <div className='reserv'>
        <h2>List of Reservation </h2> 
        <Box className="reserv-cont" style={{ display: 'flex' }}>
            {/* <MovieTable/> */}
            <Backup/>
        </Box>
    </div>
  )
}
