import React from 'react'
import './Details.css'

export default function Details() {
  return (
    <div className='container1'>
        <div className='container2'>
            <div className='reservation'>
                <div>
                <h3>Reservation Description</h3>
                </div>
                <div className='smallText'>
                    <p>ID: asdifhoainjh</p>
                </div>                
                <p>
                    
                </p>
            </div>

            <div className='seat'>
                <div style={{margin: '0 0 0 0'}}>
                    <h3>Seat Reserved</h3>
                </div>
                <div className='smallText'>
                    <p>Total No. of Seats Reserved: 10</p>
                </div>               
                <h4>
                    SEAT ID
                </h4>
                <h4 className='secondColumn'>
                    PRICE
                </h4>
                <p>
                    asdasdasd
                </p>
                <p className='secondColumn'>
                    asdasdasd
                </p>
                <p>
                    asdasdasd
                </p>
                <p className='secondColumn'>
                    asdasdasd
                </p>
                <p>
                     
                </p>
                <h4 className='total'>
                    TOTAL: 1,400
                </h4>
            </div>

            <div className='payment'>
                <header>
                    <h3>Payment Breakdown</h3>
                </header>
                <div className='payment2'>
                    <p><b>
                        Type:
                    </b></p>
                    <p className='secondColumn'>
                        350(REGULAR)
                    </p>
                    <p><b>
                        Number of Seats:
                    </b></p>
                    <p className='secondColumn'>
                        4
                    </p>
                    <p><b>
                        Discount:
                    </b></p>
                    <p className='secondColumn'>
                        20%
                    </p>
                    <p>
                        
                    </p>
                    <h4 className='total'>
                        AMOUNT OF PAY: 1,120
                    </h4>
                </div>             
            </div>
        </div>
    </div>
  )
}