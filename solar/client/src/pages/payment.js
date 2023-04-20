import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [amount, setAmount] = useState("");

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryMonthChange = (event) => {
    setExpiryMonth(event.target.value);
  };

  const handleExpiryYearChange = (event) => {
    setExpiryYear(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleTrackingIdChange = (event) => {
    setTrackingId(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paymentData = {
      request_id: trackingId,
      // card_name: cardName,
      // card_number: cardNumber,
      // expiry_month: expiryMonth,
      // expiry_year: expiryYear,
      // cvv: cvv,
      // amount: amount,
    };

    try {
      const response = await fetch(
        "https://9drglafz7b.execute-api.us-east-1.amazonaws.com/UAT",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (response.ok) {
        //setPaymentStatus("Payment submitted successfully");
        toast.success("Payment submitted successfully");
      

      } else {
        //setPaymentStatus("Error submitting payment");
        toast.error("Error submitting payment");
  
      }
    } catch (error) {
      //console.error("Error submitting payment:", error);
      //setPaymentStatus("Error submitting payment");
      toast.error("Error submitting payment",error);
    }
  };

  return (
    <Container maxWidth="sm">
      <h1 className="text-center">Payment Details</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tracking ID"
          value={trackingId}
          onChange={handleTrackingIdChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Cardholder Name"
          value={cardName}
          onChange={handleCardNameChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div className="form-row">
          <div className="form-group col-md-6">
            <TextField
              label="Expiry Month"
              value={expiryMonth}
              onChange={handleExpiryMonthChange}
              fullWidth
              margin="normal"
              placeholder="MM"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="form-group col-md-6">
            <TextField
              label="Expiry Year"
              value={expiryYear}
              onChange={handleExpiryYearChange}
              fullWidth
              margin="normal"
              placeholder="YY"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <TextField
          label="CVV"
          value={cvv}
          onChange={handleCvvChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          margin="normal"
          placeholder="$"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit Payment
        </Button>
      </form>
    </Container>
    
  );
};

export default Payment;
