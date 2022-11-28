import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({ paymentData }) => {

    const { sellingPrice, productName, save, productId, sellerEmail, buyerEmail, _id } = paymentData;

    const numberPrice = parseInt(sellingPrice)
    
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [stripeSuccess, setStripeSuccess] = useState(' ');
    const [stripeId, setStripeId] = useState(' ');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numberPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [numberPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log(error);
            setCardError(error.message);
        } else {
            setCardError('');
        }
        setSuccess('');
        setLoading(true);
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: productName,
                        email: sellerEmail,
                    },
                },
            });
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            setSuccess('congrats! your payment completed');
            setTransactionId(paymentIntent.id);
        }

        //
        const payment = {
            sellingPrice,
            buyerEmail,
            productId,
            transitionId: paymentIntent.id,
            bookingId: _id,
        };

        if (paymentIntent.status === 'succeeded') {

            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    toast.success('success');
                    // console.log(data);
                    setStripeSuccess('congrats!, Your payment completed');
                    setStripeId(paymentIntent.id);
                });
        }

        //

        setLoading(false);
        // console.log('paymentIntent', paymentIntent);
    };
    return (
        <div>
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
                <button
                    type="submit"   
                    className="btn mt-5 btn-primary btn-sm"
                    disabled={!stripe || !clientSecret || loading}>
                    Pay
                </button>
            </form>
            <div className="text-red-600"> {cardError}</div>
            {success && (
                <div>
                    <p className="text-green-600">{success}</p>
                    <p>
                        Your transactionId:{' '}
                        <span className="font-bold">{transactionId}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default CheckoutForm;