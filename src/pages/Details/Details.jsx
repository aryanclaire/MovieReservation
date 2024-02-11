import React, { useState } from 'react'
import './Details.css'
import { Box, Button, Checkbox, Modal, TextField } from '@mui/material'
import confirmPaymentIcon from '../../assets/secure-payment.png'
import successPaymentIcon from '../../assets/verified.png'


export default function Details() {
    const [checked, setChecked] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amountToPay, setAmountToPay] = useState('');
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    const handleOpenModal = () => {
        setOpenModal(true);
    }; 
    const handleCloseModal = () => {
        setOpenModal(false);
    }; 
    const handleConfirmPayment = () => {
        setPaymentConfirmed(true);
        setOpenModal(false); // Close the payment modal
    };
    const handlePaymentSuccessModalClose = () => {
        setPaymentConfirmed(false);
    };
    const handleUpdateSeats = () => {
        // Navigate to the new screen when "Update Seats" button is clicked
        
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
                    <p className='secondColumn'>350</p>
                    <p>C2</p>
                    <p className='secondColumn'>350</p>
                    <p>C3</p>
                    <p className='secondColumn'>350</p>
                    <p>C4</p>
                    <p className='secondColumn'>350</p>
                    <p></p>
                    <h4 className='total'>TOTAL: 1,400.00</h4>
                    <Button variant="contained" onClick={handleUpdateSeats} className='updateSeatBtn'>
                        Update Seats
                    </Button>   
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
                    <Button variant="contained" onClick={handleCloseModal} className='cancelPayBtn'>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleOpenModal} className='paymentBtn'>
                        Proceed to Payment
                    </Button>

                    {/* Payment modal */}
                    <Modal open={openModal} onClose={handleCloseModal}>
                        <Box className='modalContent'>
                            <img src={confirmPaymentIcon} alt="Confirm Payment Icon" className='payIcon'/>
                            <h2>Confirm Payment</h2>
                            <p>Name:           Juan Karlos</p>
                            <p>Account Number: 0999-23-323-33</p>
                            <p>Amount to Pay:  1,120</p>
                            <Button variant='contained' onClick={handleCloseModal} className='cancelBtn'>Cancel</Button>
                            <Button variant='contained' onClick={handleConfirmPayment} className='confirmBtn'>Confirm</Button>
                        </Box>
                    </Modal>  

                    <Modal open={paymentConfirmed} onClose={handlePaymentSuccessModalClose}>
                        <Box className='successContent'>
                            <div className='success'>
                                <img src={successPaymentIcon} alt="Success Payment Icon" className='successIcon'/>
                            </div>
                            <h2>Payment Successful</h2>
                            <p className='processed'>Your payment has been successfully processed.</p>
                            <p className='addInfo'>Please check your email for your reservation details.</p>
                            <Button variant='contained' onClick={handlePaymentSuccessModalClose} className='doneBtn'>Done</Button>
                        </Box>
                    </Modal>        
                </div>
            </div>
        </div>
        )
}