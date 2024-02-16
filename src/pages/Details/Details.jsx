import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
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
    //const [selectedSeats, setSelectedSeats] = useState([]);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [seniorCount, setSeniorCount] = useState(0);
    // const { movieId } = useParams(); 
    const [movieDetails, setMovieDetails] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [seats, setSeats] = useState([]);
    // Get the dynamic part of the URL
    const movieId = window.location.pathname.split('/')[2];
    let decodedSelectedSeats = JSON.parse(decodeURIComponent(window.location.pathname.split('/')[3]));
    // const location = useLocation();
    // const selectedSeats = location.state?.selectedSeats || [];
    // const { selectedSeats } = useParams();
    // const decodedSelectedSeats = selectedSeats ? JSON.parse(selectedSeats) : [];


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
            senior: seniorCount,
            res_id: currentDateTime,
            seat: decodedSelectedSeats,
            amt_pay: totalPrice
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
    const handlePaymentSuccessModalClose = () => {
        const formData = {
            is_occupied: true
        };
        try {
            decodedSelectedSeats.map(async (seat, index) => {
                const response = await fetch(`http://localhost:5555/api/movies/${movieId}/${seat}`, {
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

        // Reset form fields
        setFirstName('');
        setMiddleName('');
        setLastName('');
        decodedSelectedSeats=[];
        setMovieDetails(null);
        //setTotalPrice(0);
        //setSelectedSeats([]);
        setPaymentConfirmed(false);
    };
    const handleUpdateSeats = (seatId) => {
        // setSelectedSeats([...selectedSeats, seatId]); // Add the selected seat to the array
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
        //setSelectedSeats([]);
    };
    const handleIncrement = () => {
        if (seniorCount < decodedSelectedSeats.length)
            setSeniorCount(prevCount => prevCount + 1);
    };
    const handleDecrement = () => {
        if (seniorCount > 0) {
            setSeniorCount(prevCount => prevCount - 1);
        }
    };
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/movies/${movieId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const data = await response.json();
                // Extracting the date part
                if (data && data.m_date) {
                    data.m_date = data.m_date.substring(0, 10); // or data.m_date.split('T')[0];
                }
                // Extracting the time part from m_starttime
                if (data && data.m_starttime) {
                    data.m_starttime = data.m_starttime.substring(11, 16); // or data.m_starttime.split('T')[1].substring(0, 5);
                }

                // Extracting the time part from m_endtime
                if (data && data.m_endtime) {
                    data.m_endtime = data.m_endtime.substring(11, 16); // or data.m_endtime.split('T')[1].substring(0, 5);
                }
                // Calculate duration in hours and minutes
                const startTime = new Date(`2000-01-01T${data.m_starttime}:00`);
                const endTime = new Date(`2000-01-01T${data.m_endtime}:00`);
                const durationMinutes = Math.round((endTime - startTime) / (1000 * 60)); // Time difference in minutes

                const hours = Math.floor(durationMinutes / 60);
                const minutes = durationMinutes % 60;

                data.duration = { hours, minutes };

                setMovieDetails(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    useEffect(() => {
        const fetchSeatDetails = async () => {
            try {
                // Ensure movieId exists before fetching seat details
                if (!movieId) {
                    return;
                }
    
                const response = await fetch(`http://localhost:5555/api/movies/${movieId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch seat details');
                }
                const seatData = await response.json();
                console.log(seatData);
                const seatCount = seatData.length;
    
                // if (movieDetails.m_type === 'REGULAR') {
                //     const discountedPrice = seniorCount > 0 ? movieDetails.m_price * 0.8 : movieDetails.m_price;
                //     const basePrice = (seatCount - seniorCount) * discountedPrice;
                //     setTotalPrice(discountedPrice + basePrice);
                // } else if (movieDetails.m_type === 'PREMIERE') {
                //     setTotalPrice(seatCount * movieDetails.m_price);
                // }
    
            } catch (error) {
                console.error('Error fetching seat details:', error);
            }
        };
    
        if (movieId && movieDetails) {
            fetchSeatDetails();
        }
    }, [movieId, movieDetails, seniorCount]);
    useEffect(() => {
        console.log("Selected Seats:", decodedSelectedSeats);
    }, [decodedSelectedSeats]);
    useEffect(() => {
        const calculateTotalPrice = () => {
            if (movieDetails && decodedSelectedSeats) {
                const seatCount = decodedSelectedSeats.length;
                let totalPrice = 0;
    
                if (movieDetails.m_type.toUpperCase() === 'REGULAR') {
                    const price = (seniorCount > 0) ? (movieDetails.m_price * 0.8 * seniorCount) : movieDetails.m_price;
                    const basePrice = (seatCount - seniorCount) * movieDetails.m_price;
                    if(seniorCount > 0)
                        totalPrice = price + basePrice;
                    else totalPrice = seatCount * movieDetails.m_price;
                } else if (movieDetails.m_type.toUpperCase() === 'PREMIERE') {
                    totalPrice = seatCount * movieDetails.m_price;
                }
                setTotalPrice(totalPrice);
            }
        };
    
        calculateTotalPrice();
    }, [seniorCount, movieDetails, decodedSelectedSeats]);
    function getCurrentDateTime() {
        // Create a new Date object with the current time and date
        const currentDate = new Date();
    
        // Get the current date
        const year = currentDate.getFullYear(); // Full year (e.g., 2024)
        const month = currentDate.getMonth() + 1; // Month (0-11), adding 1 to make it 1-12
        const day = currentDate.getDate(); // Day of the month (1-31)
    
        // Get the current time
        const hours = currentDate.getHours(); // Hour (0-23)
        const minutes = currentDate.getMinutes(); // Minutes (0-59)
        const seconds = currentDate.getSeconds(); // Seconds (0-59)
    
        // Construct a string representation of the current date and time
        const currentDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    
        return currentDateTime;
    }
    
    // Call the function to get the current date and time
    const currentDateTime = getCurrentDateTime();
    
    console.log("Current Date and Time:", currentDateTime);

    return (
        <div className='container1'>
            <div className='container2'>
                <div className='reservation'>
                    <div className='title'>
                        <Typography  variant="h6" ml={1} fontWeight='bold'>RESERVATION DESCRIPTION</Typography>
                        <Typography mt={1} mr={1} sx={{fontSize: 15}}>RESERVATION ID: {currentDateTime}</Typography>
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
                            {!movieDetails || movieDetails.m_type !== 'premiere' ? (
                                <IconButton onClick={handleDecrement}>
                                    <RemoveIcon />
                                </IconButton>
                            ) : null}
                            <TextField
                                value={seniorCount}
                                variant="outlined"
                                label="Senior Citizens"
                                size="small"
                                inputProps={{ readOnly: true, style: { textAlign: 'center', height: '15px' } }}
                                sx={{ width: '200px', textAlign: 'center', '& .MuiInputBase-input': { height: '40px' } }}
                            />
                            {!movieDetails || movieDetails.m_type !== 'premiere' ? (
                                <IconButton onClick={handleIncrement}>
                                    <AddIcon />
                                </IconButton>
                            ) : null}
                        </Box>
                    </div>
                    {movieDetails && (
                        <div className='movie'>
                            <div className="text">
                                    <Typography  variant="h7">MOVIE DESCRIPTION</Typography>
                            </div>
                            <Grid container spacing={2} ml={2} mt={0.02}>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Movie Title: {movieDetails.m_title}</Typography>
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Type: {movieDetails.m_type.toUpperCase()}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Date: {movieDetails.m_date}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Start Time: {movieDetails.m_starttime}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>End Time: {movieDetails.m_endtime}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Duration: {movieDetails.duration.hours} hr {movieDetails.duration.minutes} min</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>Price: ₱ {movieDetails.m_price.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>MPA FILM RATING: {movieDetails.m_mpa}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </div>

                <div className='seat-cont'>
                    <div className='title'>
                        <Typography  variant="h6" ml={1} fontWeight='bold'>SEAT RESERVED</Typography>
                        <Typography mt={1} mr={2}>Total Number of Seats Reserved: {decodedSelectedSeats.length}</Typography>
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
                                    {decodedSelectedSeats.map((seat, index) => (
                                        <TableRow key={index}>
                                            <TableCell align='center'>{seat}</TableCell>
                                            <TableCell align='center'> ₱ {movieDetails ? movieDetails.m_price.toFixed(2) : '-'}</TableCell>
                                            {/* <TableCell>{seat}</TableCell> */}
                                            {/* Display more properties of the seat if available*/ }
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </div>
                    <div className="seat-btn">
                        <Button
                            as={Link}
                            to={`/movies/${movieId}`}
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
                                        <TableCell align="right">{movieDetails ? movieDetails.m_type.toUpperCase() : '-'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='left'><Typography fontWeight='bold' fontSize='small'>Number of Seats: </Typography></TableCell>
                                        <TableCell align="right">{decodedSelectedSeats.length}</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell align='left'><Typography fontWeight='bold' fontSize='small'>Discount: </Typography></TableCell>
                                        <TableCell align="right">20%</TableCell>
                                    </TableRow> */}
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align='right'><Typography fontWeight='bold' fontSize='small'>AMOUNT TO PAY: ₱ {totalPrice.toFixed(2)}</Typography></TableCell>
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
                            <Typography>Reservation ID:  {currentDateTime}</Typography>
                            <Typography>Amount to Pay:   ₱ {totalPrice.toFixed(2)}</Typography>
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
                                as={Link}
                                to="/"
                                variant='contained'
                                onClick={handlePaymentSuccessModalClose} 
                                className='doneBtn'
                                sx={{
                                    width:'100px',
                                    marginTop: '15px',
                                    marginBottom: '50px',
                                    borderRadius: '5px',
                                    textDecoration:'none'
                                }}
                            >
                                Done
                            </Button>
                        </Box>
                    </Modal>    
                </div>
            </div>
        </div>
    )
}