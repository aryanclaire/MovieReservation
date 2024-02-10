import React, { useState } from 'react'
import './Details.css'
import { Box, Checkbox, TextField } from '@mui/material'

export default function Details() {
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

    return (
        <div className='container1'>
            <div className='container2'>
                <div className='reservation'>
                    <h3>Reservation Description</h3>
                    <h4>Customer Description</h4>
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
                    
                    <div className='checkbox'>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        /> <p>Senior Citizen</p>
                    </div>
                    
                    <h4>Movie Description</h4>
                    <div className='movie'>
                        <p>Movie Title: Rewind</p>
                        <p>Type: Regular</p>
                        <p>Date: FEB 02, 2024</p>
                        <p>Start Time: 12:00 pm</p>
                        <p>End Time: 2:30 pm</p>
                        <p>No. of Hours: 2 hrs 30 min</p>
                        <p>Price: 350.00</p>
                        <p>MPA Final Rating: Rated G</p>
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