import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
    const bookingData = useLoaderData()
    console.log(bookingData)

    return (
        <div>
            <h1 className='text-5xl'>Pay for {bookingData.name}</h1>
            <p className='text-xl'>Amount: <strong>${bookingData.price}</strong></p>
            <div className="w-96 mt-10 border-2 p-3">
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        booking={bookingData}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;