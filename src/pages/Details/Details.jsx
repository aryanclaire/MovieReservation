import React from 'react'
import './Details.css'

export default function Details() {
  return (
    <div className='container1'>
        <div className='container2'>
            <div className='reservation'>
                <div className='reservation2'>
                    <div>
                        <h3>Reservation Description</h3>
                    </div>
                    <div className='smallText'>
                        <p>ID: (id here)</p>
                    </div>
                </div>
                <p><b>Customer Description</b></p>
                <div className='customerDescription'>
                    <p>First Name: (type here)</p>
                    <p>Last Name: (date here)</p>
                    <p>Middle Time: (time here)</p>
                    <p>(input box here)</p>
                    <p>(input box here)</p>
                    <p>(input box here)</p>
                    <p>(checkbox here) Senior Citizen</p>
                </div>
                <p><b>Movie Description</b></p>
                <div className='movieDescription'>
                    <p>Movie Title: (title here)</p>
                    <p></p>
                    <p>Type: (type here)</p>
                    <p>Date: (date here)</p>
                    <p>Start Time: (time here)</p>
                    <p>End Time: (time here)</p>
                    <p>Duration: (duration here)</p>
                    <p>Price: (price here)</p>
                    <p></p>
                    <p>MPA FILM RATING: (rating here)</p>
                </div>
            </div>

            <div className='seat'>
                <div>
                    <h3>Seat Reserved</h3>
                </div>
                <div className='smallText'>
                    <p>Total No. of Seats Reserved: (seats here)</p>
                </div>
                <h4> SEAT ID</h4>
                <h4 className='secondColumn'>PRICE</h4>
                <p>(ID1 here)</p>
                <p className='secondColumn'>(price here)</p>
                <p>(ID2 here)</p>
                <p className='secondColumn'>(price here)</p>
                <p></p>
                <h4 className='total'>TOTAL: (total here)</h4>
            </div>

            <div className='payment'>
                <header>
                    <h3>Payment Breakdown</h3>
                </header>
                <div className='payment2'>
                    <p><b>Type:</b></p>
                    <p className='secondColumn'>(type here)</p>
                    <p><b>Number of Seats:</b></p>
                    <p className='secondColumn'>(number here)</p>
                    <p><b>Discount:</b></p>
                    <p className='secondColumn'>(discount here)</p>
                    <p></p>
                    <h4 className='total'>AMOUNT OF PAY: (total here)</h4>
                </div>             
            </div>
        </div>
    </div>
  )
}