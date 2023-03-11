import React, { useState } from "react";
import Navbar from "./navbar";
// import { Form, Button, Row, Col } from 'react-bootstrap';
import "./UserRequestForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { progress } from "./progress";
// const UserRequestForm = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle submission logic here
//   };

//   return (
//     <div className="user-request-form">
//       <h2>Submit a Request</h2>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col md={6}>
//             <Form.Group controlId="name">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 className="input-field"
//                 type="text"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(event) => setName(event.target.value)}
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group controlId="email">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 className="input-field"
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(event) => setEmail(event.target.value)}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Form.Group controlId="message">
//           <Form.Label>Message</Form.Label>
//           <Form.Control
//             className="input-field"
//             as="textarea"
//             rows={3}
//             value={message}
//             onChange={(event) => setMessage(event.target.value)}
//           />
//         </Form.Group>
//         <Button className="submit-btn" variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
export default function UserRequestForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      email_address: email,
      phone_number: phone,
      street_address1: streetAddress,
      city: city,
      state: state,
      zip_code: zipCode,
      message: message,
    };

    try {
      const response = await fetch(
        "https://xntg7p1h47.execute-api.us-east-1.amazonaws.com/UAT/first",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      const customer_id = responseData.request_id;

      // Clear form inputs after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setStreetAddress("");
      setCity("");
      setState("");
      setZipCode("");
      setMessage("");

      // Display success message to user
      toast.success(
        `Thank you! Tracking Id will me mailed to you(Click to copy the ID)`,
        {
          onClick: () => {
            copyToClipboard(customer_id);
            // window.location.href = '/userprog';
          },
        }
      );
    } catch (err) {
      console.log(err);

      // Display error message to user
      toast.error(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!(Click to redirect)", {
          onClick: () => {
            window.location.href = "/userprog";
          },
        });
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };
  return (
    <>
      <div>
        <Navbar />
        <h1>Customer Request Form</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="streetAddress1">Street Address 1:</label>
          <input
            type="text"
            id="streetAddress1"
            name="streetAddress1"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            required
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />

          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            id="message"
            rows={5}
            cols={60}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <br></br>
          <br></br>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
