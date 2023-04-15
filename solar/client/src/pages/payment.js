import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Card, CardContent, Container, Typography } from '@mui/material';

const Payment = () => {
    const [paymentStatus, setPaymentStatus] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentStatus(`Error: ${error.message}`);
    } else {
      setPaymentStatus('Payment method created successfully!');
      // Here, you would send the paymentMethod.id to your server to process the fake payment.
    }
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" align='center' >
            Welcome to the Payment Page
          </Typography>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!stripe}
              sx={{ marginTop: 2 }}
            >
              Pay
            </Button>
          </form>
          {paymentStatus && (
            <Typography
              variant="body1"
              color={paymentStatus.startsWith('Error') ? 'error' : 'success'}
              sx={{ marginTop: 2 }}
            >
              {paymentStatus}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Payment;
