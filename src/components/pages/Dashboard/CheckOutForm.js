import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../shared/Loader';

const CheckOutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)
    const [trxId, setTrxId] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe()
    const elements = useElements()
    const { price, buyerName, buyerEmail, _id } = booking
    const navigate = useNavigate()


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        setSuccess('')
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail,
                    }
                }
            }
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {

            const payment = {
                price,
                transactionId: paymentIntent.id,
                email: buyerEmail,
                bookingId: _id
            }

            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrats! Your payment is success')
                        setTrxId(paymentIntent.id)
                        navigate('/dashboard')
                    }
                })
        }
        setProcessing(false)

        if (setProcessing) {
            return <Loader></Loader>
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm mt-16 btn-accent' type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
            <p className='text-red-500'>{cardError}</p>
            {
                success && <div>
                    <p className="text-emerald-500">{success}</p>
                    <p>TrxID: <span className='font-bold'>{trxId}</span></p>
                </div>
            }
        </form>
    );
};

export default CheckOutForm;