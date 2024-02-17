import React from 'react'
import { Box, Typography } from '@mui/material';
import ReserveTable from './ReserveTable';

export default function ReservationList() {
  return (
    <div className='reserv'>
        <h2>List of Reservation </h2> 
        {/* CALL RESERVE TABLE COMPONENTS */}
            <ReserveTable/>
    </div>
  )
}
