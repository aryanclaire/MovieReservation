import React from 'react'
import './Details.css'
import { Box, TextField } from '@mui/material'

export default function Details() {
  return (
    <div className='container1'>
        <div className='container2'>
            <div className='reservation'>
                <header>
                    <h3>Reservation Description</h3>
                </header>
                <div className='textfield'>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            '& > :not(style)': { m: 1, width: '19ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="fname" label="First Name" variant="outlined" />
                        <TextField id="mname" label="Middle Name" variant="outlined" />
                        <TextField id="lname" label="Last Name" variant="outlined" />
                    </Box>
                </div>
            </div>

            <div className='seat'>
                <div>
                    <h3>Seat Reserved</h3>
                </div>
                <div className='smallText'>
                    <p>Total No. of Seats Reserved: 10</p>
                </div>               
        
            </div>

            <div className='payment'>
                <header>
                    <h3>Payment Breakdown</h3>
                </header>                
                <p>
                    
                </p>
            </div>
        </div>
    </div>
  )
}