// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import './Payment.css';

// const stripePromise = loadStripe('pk_test_51NzFKYSGAnIzLOoHK24AAHxgaBNdDP6kjFPZ0nX5gy2WEPlzANRTTRON7ur42U2mpNc3i1ykkjbA5ky74Z7x3v7300kBK6vf1h'); // Replace with your Stripe public key

// const CheckoutForm = ({ amount, specials, items }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [clientSecret, setClientSecret] = useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');

//     const backendUrl = 'http://localhost:3001/create-payment-intent';

//     useEffect(() => {
//         axios.post(backendUrl, { amount: amount * 100, description: 'Export of digital goods or services' })
//             .then((response) => {
//                 console.log('Response from backend:', response.data);
//                 setClientSecret(response.data.clientSecret);
//             })
//             .catch((error) => {
//                 console.error('Error fetching clientSecret:', error);
//                 setError('Failed to initialize payment. Please try again.');
//             });
//     }, [amount]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         if (!stripe || !elements || !clientSecret) {
//             setError("Stripe.js hasn't loaded or clientSecret is missing.");
//             setLoading(false);
//             return;
//         }

//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//                 billing_details: {
//                     name,
//                     email,
//                     address: {
//                         line1: address,
//                         country: 'IN',
//                     },
//                 },
//             },
//         });

//         if (error) {
//             setError(error.message);
//             setLoading(false);
//         } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//             console.log('Payment succeeded!');
//             setLoading(false);
//             // You can trigger any success action here, like redirecting the user or showing a success message
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="product-summary">
//                 <h2>Review Your Order</h2>
//                 {items.map((item, index) => (
//                     <div key={index} className="item">
//                         <p>{item.name} - {item.quantity} x ₹{item.price}</p>
//                     </div>
//                 ))}
//                 <p>Shipping: ₹{50}</p> {/* Example shipping cost */}
//                 <h3>Total: ₹{amount}</h3>
//             </div>
//             <div className="shipping-information">
//                 <label>
//                     Email:
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Address:
//                     <input
//                         type="text"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         required
//                     />
//                 </label>
//             </div>
//             <div className="payment-details">
//                 <CardElement />
//                 {error && <div style={{ color: 'red' }}>{error}</div>}
//             </div>
//             <button type="submit" disabled={!stripe || loading || !clientSecret}>
//                 {loading ? 'Processing...' : `Pay ₹${amount}`}
//             </button>
//         </form>
//     );
// };

// const PaymentPage = () => {
//     const amount = 13400; // Amount in rupees
//     const specials = "Special Discount"; // Custom message for specials
//     const items = [
//         { name: 'Pure set', quantity: 1, price: 6500 },
//         { name: 'Pure glow cream', quantity: 2, price: 3200 },
//     ];

//     return (
//         <Elements stripe={stripePromise}>
//             <CheckoutForm amount={amount} specials={specials} items={items} />
//         </Elements>
//     );
// };

// export default PaymentPage;

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './Payment.css';

const stripePromise = loadStripe('pk_test_51NzFKYSGAnIzLOoHK24AAHxgaBNdDP6kjFPZ0nX5gy2WEPlzANRTTRON7ur42U2mpNc3i1ykkjbA5ky74Z7x3v7300kBK6vf1h'); // Replace with your Stripe public key

const CheckoutForm = ({ amount, specials, items }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [upiId, setUpiId] = useState(''); // State for dynamic UPI ID
    const [paymentMethodType, setPaymentMethodType] = useState('card');

    const backendUrl = 'http://localhost:3001/create-payment-intent';

    useEffect(() => {
        axios.post(backendUrl, { amount: amount * 100, description: 'Export of digital goods or services',  paymentMethodType: paymentMethodType })
            .then((response) => {
                setClientSecret(response.data.clientSecret);
            })
            .catch((error) => {
                console.error('Error fetching clientSecret:', error);
                setError('Failed to initialize payment. Please try again.');
            });
    }, [amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !clientSecret) {
            setError("Stripe.js hasn't loaded or clientSecret is missing.");
            setLoading(false);
            return;
        }

        let paymentMethodData = {
            billing_details: {
                name,
                email,
                address: {
                    line1: address,
                    country: 'IN',
                },
            },
        };

        if (paymentMethodType === 'card') {
            paymentMethodData.card = elements.getElement(CardElement);
        } else if (paymentMethodType === 'upi') {
            if (!upiId) {
                setError('Please enter a valid UPI ID.');
                setLoading(false);
                return;
            }
            paymentMethodData.upi = { vpa: upiId };
        }

        try {
            let paymentMethodResult;
            if (paymentMethodType === 'card') {
                paymentMethodResult = await stripe.createPaymentMethod({
                    type: 'card',
                    ...paymentMethodData,
                });
            } else if (paymentMethodType === 'upi') {
                paymentMethodResult = await stripe.createPaymentMethod({
                    type: 'upi',
                    ...paymentMethodData,
                });
            }

            if (paymentMethodResult.error) {
                setError(paymentMethodResult.error.message);
                setLoading(false);
                return;
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodResult.paymentMethod.id,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');
                setLoading(false);
                // Success actions here
            }
        } catch (error) {
            console.error('Payment failed:', error);
            setError('Payment failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="product-summary">
                <h2>Review Your Order</h2>
                {items.map((item, index) => (
                    <div key={index} className="item">
                        <p>{item.name} - {item.quantity} x ₹{item.price}</p>
                    </div>
                ))}
                <p>Shipping: ₹{50}</p> {/* Example shipping cost */}
                <h3>Total: ₹{amount}</h3>
            </div>
            <div className="shipping-information">
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="payment-details">
                <label>
                    Payment Method:
                    <select value={paymentMethodType} onChange={(e) => setPaymentMethodType(e.target.value)}>
                        <option value="card">Card</option>
                        <option value="upi">UPI</option>
                    </select>
                </label>
                {paymentMethodType === 'card' && <CardElement />}
                {paymentMethodType === 'upi' && (
                    <label>
                        UPI ID:
                        <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="example@upi"
                            required
                        />
                    </label>
                )}
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
            <button type="submit" disabled={!stripe || loading || !clientSecret}>
                {loading ? 'Processing...' : `Pay ₹${amount}`}
            </button>
        </form>
    );
};

const PaymentPage = () => {
    const amount = 13400; // Amount in rupees
    const specials = "Special Discount"; // Custom message for specials
    const items = [
        { name: 'Pure set', quantity: 1, price: 6500 },
        { name: 'Pure glow cream', quantity: 2, price: 3200 },
    ];

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} specials={specials} items={items} />
        </Elements>
    );
};

export default PaymentPage;
