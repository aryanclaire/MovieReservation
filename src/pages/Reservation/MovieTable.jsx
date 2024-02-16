import React, { useEffect, useState } from 'react';
import { Box, TableCell, TableContainer, Table, TableHead, TableRow, Paper, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

export default function Backup() {
    const [reserve, setReserve] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState(null);

    useEffect(() => {
        const fetchReserve = async () => {
            try {
                const response = await fetch('http://localhost:5555/api/details/');
                if (!response.ok) {
                    throw new Error('Failed to fetch reservations');
                }
                const data = await response.json();
                setReserve(data);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchReserve();
    }, []);

    const handleCancelToggle = (reservationId) => {
        setSelectedReservationId(reservationId);
        setOpenDialog(true);
    };

    const handleCancelConfirm = () => {

      // Perform the actual cancellation action
        const updatedReserve = reserve.map(item => {
            if (item.res_id === selectedReservationId) {
                // return { ...item, isCancel: true };
                console.log(item.m_id);
                console.log(item.seat);
                console.log(item.isCancel);
                
                const seats = item.seat;



                // **********************************************
                const formData = {
                  is_occupied: false
                  };
                  try {
                    seats.map(async (id, index) => {
                          const response = await fetch(`http://localhost:5555/api/movies/${item.m_id}/${id}`, {
                              method: 'PATCH',
                              headers: {
                                  'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(formData)
                          });
                  
                          if (!response.ok) {
                              throw new Error('Failed to submit data');
                          }
                      });
                  } catch (error) {
                      console.error('Error submitting data:', error);
                  }


                // **********************************************


            }
            return item;
        });
      
    };
        
        // setReserve(updatedReserve);
        // setOpenDialog(false);

    

    const handleCancelReject = () => {
        setOpenDialog(false);
    };

    return (
        <div className='reserv'>
            <h2>List of Reservations</h2> 
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Reservation ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Senior</TableCell>
                                <TableCell>Seats</TableCell>
                                <TableCell>Amount Paid</TableCell>
                                <TableCell>Reservation ID</TableCell>
                                <TableCell>Cancelled</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reserve.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.res_id}</TableCell>
                                    <TableCell>{`${row.f_name} ${row.m_name} ${row.l_name}`}</TableCell>
                                    <TableCell>{row.senior}</TableCell>
                                    <TableCell>{row.seat.join(', ')}</TableCell>
                                    <TableCell>{row.amt_pay}</TableCell>
                                    <TableCell>{row.m_id}</TableCell>
                                    <TableCell>
                                        {!row.isCancel ? 
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                onClick={() => handleCancelToggle(row.res_id)}
                                            >
                                                Cancel
                                            </Button>
                                            :
                                            "Yes"
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Dialog open={openDialog}>
                <DialogTitle>Confirm Cancellation</DialogTitle>
                <DialogContent>
                    <Box>
                        <Typography>
                            Are you sure you want to cancel this reservation?
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelConfirm} color="error">Yes</Button>
                    <Button onClick={handleCancelReject} color="primary">No</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
