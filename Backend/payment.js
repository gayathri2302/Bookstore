// const express = require('express');
// const Stripe = require('stripe');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import cors

// const app = express();
// const stripe = Stripe('sk_test_51NzFKYSGAnIzLOoH5i3q7aFBJwY4CsynaHGbiy44Lwokwhku38oIzkOd02DaosdHKrOz2ebhUqROV4e05lL0iArh00voUOnue7'); // Replace with your Stripe secret key

// app.use(cors()); // Enable CORS for all routes
// app.use(bodyParser.json());

// app.post('/create-payment-intent', async (req, res) => {
//     const { amount, description } = req.body; // Amount in cents and description

//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency: 'usd',
//             description, 
//         });

//         res.status(200).send({
//             clientSecret: paymentIntent.client_secret,
//         });
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// });

// app.listen(3001, () => {
//     console.log('Server is running on port 3001');
// });

const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const stripe = Stripe('sk_test_51NzFKYSGAnIzLOoH5i3q7aFBJwY4CsynaHGbiy44Lwokwhku38oIzkOd02DaosdHKrOz2ebhUqROV4e05lL0iArh00voUOnue7'); // Replace with your Stripe secret key

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount, description, paymentMethodType } = req.body; // Include paymentMethodType

    try {
        // Create a PaymentIntent with the provided amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr', // Currency should be INR for Indian payment methods
            description,
            payment_method_types: paymentMethodType ? [paymentMethodType] : ['card', 'upi'], // Add UPI and Card as default payment methods
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
