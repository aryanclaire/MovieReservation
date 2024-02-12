import React, { useState } from 'react'
import './Details.css'
import { Box, Button, Checkbox, Modal, Stack, TextField, Backdrop } from '@mui/material'
import confirmPaymentIcon from '../../assets/secure-payment.png'
import successPaymentIcon from '../../assets/verified.png'


export default function Details() {
    const [checked, setChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    const handleCloseModal = () => {
        setOpenModal(false);
    }; 
    const handleConfirmPayment = () => {
        setPaymentConfirmed(true);
        setOpenModal(false); // Close the payment modal
    };
    const handlePaymentSuccessModalClose = (event) => {
        // Reset form fields
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setChecked(event.target.checked);
        setPaymentConfirmed(false);
    };
    const handleUpdateSeats = () => {
        // Navigate to the new screen when "Update Seats" button is clicked
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (firstName.trim() === '' || middleName.trim() === '' || lastName.trim() === '') {
            alert('Please provide your complete name!');
            return;
        }

        // Proceed to payment modal
        setOpenModal(true);
        // Perform submission logic here
        // For example, you can send the form data to an API endpoint
        
        // After submission, you can reset the form fields
        // Handle submission of form data
        // Here you can perform any validation or processing before submitting the form
        console.log('Form submitted!');
        console.log('First Name:', firstName);
        console.log('Middle Name:', middleName);
        console.log('Last Name:', lastName);
    };
    const handleBackdropClick = (event) => {
        // Prevent closing the modal if the backdrop is clicked
        event.stopPropagation();
    };
    return (
        <div className='container1'>
            <div className='container2'>
                <div className='reservation'>
                    <div className='reservation2'>
                        <div>
                            <h3>Reservation Description</h3>
                        </div>
                        <div className='smallText'>
                            <p>ID: 001-9203-937</p>
                        </div>
                    </div>
                        <p><b>Customer Description</b></p>
                        <div className='textfield'>
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '& > :not(style)': { m: 1, width: '27ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <TextField 
                                    id="fname" 
                                    label="First Name" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} 
                                />
                                <TextField 
                                    id="mname" 
                                    label="Middle Name" 
                                    variant="outlined" 
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
                                />
                                <TextField 
                                    id="lname" 
                                    label="Last Name" 
                                    variant="outlined" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Box>
                        </div>
                        
                        <div className='checkbox'>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            /> <p>Senior Citizen</p>
                        </div>
                        <p><b>Movie Description</b></p>
                    <div className='movieDescription'>
                        <p>Movie Title: Rewind</p>
                        <p></p>
                        <p>Type: REGULAR</p>
                        <p>Date: FEB 02, 2024</p>
                        <p>Start Time: 12:00 pm</p>
                        <p>End Time: 14:30 pm</p>
                        <p>Duration: 2 hr 30 min</p>
                        <p>Price: 350</p>
                        <p></p>
                        <p>MPA FILM RATING: Rated G</p>
                    </div>
                </div>
                
                <div className="seat-cont">
                    <div className='seat'>
                        <div>
                            <h3>Seat Reserved</h3>
                        </div>
                        <div className='smallText'>
                            <p>Total No. of Seats Reserved: 4</p>
                        </div>
                        <h4> SEAT ID</h4>
                        <h4 className='secondColumn'>PRICE</h4>
                        <p>C1</p>
                        <p className='secondColumn'>350.00</p>
                        <p>C2</p>
                        <p className='secondColumn'>350.00</p>
                        <p>C3</p>
                        <p className='secondColumn'>350.00</p>
                        <p>C4</p>
                        <p className='secondColumn'>350.00</p>
                        <p></p>
                        <h4 className='total'>TOTAL: 1,400.00</h4>
                    </div>
                    <div className="seat-btn">
                        <Button 
                            variant="contained" 
                            onClick={handleUpdateSeats}
                            sx={{
                                width:'200px',
                                marginTop: '25px',
                                marginBottom: '15px',
                                borderRadius: '10px',
                                marginLeft: '460px'
                            }}
                        >
                            Update Seats
                        </Button>   
                    </div>
                </div>

                <div className='payment'>
                    <header>
                        <h3>Payment Breakdown</h3>
                    </header>
                    <div className='payment2'>
                        <p><b>Type:</b></p>
                        <p className='secondColumn'>350 (SENIOR CITIZEN)</p>
                        <p><b>Number of Seats:</b></p>
                        <p className='secondColumn'>4</p>
                        <p><b>Discount:</b></p>
                        <p className='secondColumn'>20%</p>
                        <p></p>
                        <h4 className='total'>AMOUNT TO PAY: 1,120.00</h4>
                    </div>
                    <Stack spacing={10} direction="row" marginTop={5} marginLeft={3}>
                        <Button 
                            variant="contained" 
                            onClick={handleCloseModal} 
                            // className='cancelPayBtn' 
                            sx={{
                                width:'250px',
                                backgroundColor: 'gray',
                                '&:hover': {
                                    backgroundColor: 'gray',
                                },
                                borderRadius: '10px'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={handleSubmit} 
                            // className='paymentBtn'
                            sx={{
                                width:'250px',
                                borderRadius: '10px'
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
                            <h2>Confirm Payment</h2>
                            <p>Name:           {firstName} {middleName} {lastName}</p>
                            <p>Account Number: 0999-23-323-33</p>
                            <p>Amount to Pay:  1,120</p>
                            <Stack spacing={5} direction="row" marginTop={5} marginLeft={10} marginBottom={5}>
                                <Button 
                                    variant='contained' 
                                    onClick={handleCloseModal} 
                                    // className='cancelBtn'
                                    sx={{
                                        width:'100px',
                                        borderRadius: '10px',
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
                                    onClick={handleConfirmPayment} 
                                    // className='confirmBtn'
                                    sx={{
                                        width:'100px',
                                        borderRadius: '10px'
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
                            <h2>Payment Successful</h2>
                            <p className='processed'>Your payment has been successfully processed.</p>
                            <p className='addInfo'>Please check your email for your reservation details.</p>
                            <Button 
                                variant='contained'
                                onClick={handlePaymentSuccessModalClose} 
                                className='doneBtn'
                                sx={{
                                    width:'100px',
                                    marginTop: '15px',
                                    marginBottom: '15px',
                                    borderRadius: '10px'
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