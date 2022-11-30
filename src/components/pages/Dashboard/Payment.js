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
        <div className='mt-10'>
            <h1 className='text-3xl font-semibold text-emerald-500'>Pay for {bookingData.name}</h1>
            <p className='text-xl text-red-400 font-semibold'>Amount: <strong>${bookingData.price}</strong></p>
            <div className="w-[700px] mx-auto mt-10 p-10 border-2 border-teal-200 shadow-lg shadow-emerald-200">
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