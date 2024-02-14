import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Details.css';
import { Backdrop, Box, Button, Grid, IconButton, Modal, Paper, 
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, TextField, Typography } from '@mui/material';
import confirmPaymentIcon from '../../assets/secure-payment.png';
import successPaymentIcon from '../../assets/verified.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function Details() {
    const [openModal, setOpenModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [seniorCount, setSeniorCount] = useState(0);

    const handleCloseModal = () => {
        setOpenModal(false);
    }; 
    const handleOpenModal = (e) => {
        e.preventDefault()
        if (firstName.trim() === '' || middleName.trim() === '' || lastName.trim() === '') {
            alert(`Please enter customer's complete name.`);
            return;
        }
        setOpenModal(true);
    };
    const handleConfirmPayment = async (e) => {
        e.preventDefault();
        const formData = {
            f_name: firstName,
            m_name: middleName,
            l_name: lastName,
            senior: seniorCount
        };
    
        try {
            const response = await fetch('http://localhost:5555/api/details/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
            // Proceed to success modal
            setOpenModal(true);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
        setPaymentConfirmed(true);
        setOpenModal(false); // Close the payment modal
    };
    const handlePaymentSuccessModalClose = (event) => {
        // Reset form fields
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setSelectedSeats([]);
        setPaymentConfirmed(false);
    };
    const handleUpdateSeats = (seatId) => {
        setSelectedSeats([...selectedSeats, seatId]); // Add the selected seat to the array
    };
    const handleCancel = () => {
        // Empty selected seats
        emptySelectedSeats();

        // Clear form fields
        setFirstName('');
        setMiddleName('');
        setLastName('');
    };
    const handleBackdropClick = (event) => {
        // Prevent closing the modal if the backdrop is clicked
        event.stopPropagation();
    };
    const emptySelectedSeats = () => {
        // Empty selected seats by resetting the state variable to an empty array
        setSelectedSeats([]);
    };
    const handleIncrement = () => {
        setSeniorCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        if (seniorCount > 0) {
            setSeniorCount(prevCount => prevCount - 1);
        }
    };

    return (
        <div className='container1'>
            
            <div className='container2'>
                <div className='reservation'>
                    <div className='title'>
                        <Typography  variant="h6" ml={1} fontWeight='bold'>RESERVATION DESCRIPTION</Typography>
                        <Typography mt={1} mr={1}>ID: 001-9203-937</Typography>
                    </div>
                    <div className='customer'>
                        <div className="text">
                            <Typography  variant="h7">CUSTOMER DESCRIPTION</Typography>
                        </div>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                '& > :not(style)': { m: 1, width: '23ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="fname" 
                                label="First Name" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                size="small" 
                            />
                            <TextField
                                id="mname" 
                                label="Middle Name" 
                                variant="outlined"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                size="small"
                            />
                            <TextField 
                                id="lname" 
                                label="Last Name" 
                                variant="outlined" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                size="small"
                            />
                        </Box>
                        <Box display="flex" alignItems="center" mt={2} mb={3} width={190} height={20} justifyContent="space-between">
                            <IconButton onClick={handleDecrement}>
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                value={seniorCount}
                                variant="outlined"
                                label="Senior Citizens"
                                size="small"
                                inputProps={{ readOnly: true, style: { textAlign: 'center', height: '15px' } }}
                                sx={{ width: '200px', textAlign: 'center', '& .MuiInputBase-input': { height: '40px' } }}
                            />
                            <IconButton onClick={handleIncrement}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </div>
                    <div className='movie'>
                        <div className="text">
                                <Typography  variant="h7">MOVIE DESCRIPTION</Typography>
                        </div>
                        <Grid container spacing={2} ml={2} mt={0.02}>
                            <Grid item xs={4}>
                                <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Movie Title: REWIND</Typography>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Type: REGULAR</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Date: FEB 02, 2024</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Start Time: 12:00 pm</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>End Time: 14:30 pm</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Duration: 2 hr 30 min</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Price: ₱ 350.00</Typography>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>MPA FILM RATING: Rated G</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div className='seat-cont'>
                    <div className='title'>
                        <Typography  variant="h6" ml={1} fontWeight='bold'>SEAT RESERVED</Typography>
                        <Typography mt={1} mr={1}>Total Number of Seats Reserved: 4</Typography>
                    </div>
                    <div className='table'>
                        <TableContainer component={Paper} sx={{ width: '95%' }}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead sx={{ backgroundColor: '#BBE2EC' }}>
                                    <TableRow>
                                        <TableCell align='center'><Typography fontWeight='bold' fontSize='small'>SEAT</Typography></TableCell>
                                        <TableCell align="center"><Typography fontWeight='bold' fontSize='small'>PRICE</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ backgroundColor: '#f0f0f0' }}>
                                    <TableRow>
                                        <TableCell align='center'>C1</TableCell>
                                        <TableCell align="center">₱ 350.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>H1</TableCell>
                                        <TableCell align="center">₱ 350.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="seat-btn">
                        <Button
                            as={Link}
                            to="/reserve"
                            variant="contained" 
                            onClick={handleUpdateSeats}
                            sx={{
                                width:'150px',
                                top:'160px',
                                left:'230px',
                                textDecoration:'none'
                            }}
                        >
                            Update Seats
                        </Button>   
                    </div>
                </div>

                <div className='payment'>
                    <div className='title'>
                        <Typography  variant="h6" ml={1} fontWeight='bold'>PAYMENT BREAKDOWN</Typography>
                    </div>
                    <div className='table'>
                        <TableContainer component={Paper} sx={{ width: '95%' }}>
                            <Table size="small" aria-label="a dense table">
                                <TableBody sx={{ backgroundColor: '#f0f0f0' }}>
                                    <TableRow>
                                        <TableCell align='left'><Typography fontWeight='bold' fontSize='small'>Type: </Typography></TableCell>
                                        <TableCell align="right">350 (REGULAR)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='left'><Typography fontWeight='bold' fontSize='small'>Number of Seats: </Typography></TableCell>
                                        <TableCell align="right">4</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='left'><Typography fontWeight='bold' fontSize='small'>Discount: </Typography></TableCell>
                                        <TableCell align="right">20%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align='right'><Typography fontWeight='bold' fontSize='small'>AMOUNT TO PAY: ₱ 1,120.00</Typography></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <Stack spacing={10} direction="row" marginTop={2} marginBottom={1.5} justifyContent='center'>
                        <Button 
                            as={Link}
                            to="/movies"
                            variant="contained" 
                            onClick={handleCancel}
                            sx={{
                                width:'205px',
                                backgroundColor: 'gray',
                                '&:hover': {
                                    backgroundColor: 'gray',
                                },
                                borderRadius: '5px',
                                textDecoration:'none'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={handleOpenModal}
                            sx={{
                                width:'205px',
                                borderRadius: '5px'
                            }}
                        >
                            Proceed to Payment
                        </Button>   
                    </Stack>

                    {/* Payment modal */}
                    <Modal 
                        open={openModal} 
                        onClose={handleCloseModal} 
                        BackdropComponent={Backdrop} 
                        BackdropProps={{ onClick: handleBackdropClick }}
                    >
                        <Box className='modalContent'>
                            <img src={confirmPaymentIcon} alt="Confirm Payment Icon" className='payIcon'/>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', mt: 2, mb: 2, ml: 12 }}>Confirm Payment</Typography>
                            <Typography>Name:   {firstName} {middleName} {lastName}</Typography>
                            <Typography>Reservation ID:  001-9203-937</Typography>
                            <Typography>Amount to Pay:   ₱ 1,120</Typography>
                            <Stack spacing={5} direction="row" marginTop={5} marginLeft={10} marginBottom={5}>
                                <Button 
                                    variant='contained' 
                                    onClick={handleCloseModal} 
                                    sx={{
                                        width:'100px',
                                        borderRadius: '5px',
                                        backgroundColor: 'gray',
                                        '&:hover': {
                                            backgroundColor: 'gray',
                                        },
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    variant='contained' 
                                    onClick={(e) => handleConfirmPayment(e)}
                                    sx={{
                                        width:'100px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Confirm
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>

                    <Modal 
                        open={paymentConfirmed} 
                        onClose={handlePaymentSuccessModalClose} 
                        BackdropComponent={Backdrop} 
                        BackdropProps={{ onClick: handleBackdropClick }}
                    >
                        <Box className='successContent'>
                            <div className='success'>
                                <img src={successPaymentIcon} alt="Success Payment Icon" className='successIcon'/>
                            </div>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', mt: 2, mb:2 }}>Payment Successful</Typography>
                            <Typography>Your payment has been successfully processed.</Typography>
                            <Typography>Please check your email for your reservation details.</Typography>
                            <Button 
                                variant='contained'
                                onClick={handlePaymentSuccessModalClose} 
                                className='doneBtn'
                                sx={{
                                    width:'100px',
                                    marginTop: '15px',
                                    marginBottom: '15px',
                                    borderRadius: '5px'
                                }}
                            >
                                Done
                            </Button>
                        </Box>
                    </Modal>    
                </div>
                <div>
                
                </div>
            </div>
        </div>
    )
}