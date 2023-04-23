import React, { useState } from "react";
// import "../css/UserRequestForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion'
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0 },
};

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ><div className="background-image"></div>
      <motion.div
        className="box"
        variants={boxVariant}
        initial="hidden"
        animate="visible"
      >
        {/* <Navbar /> */}
        <MDBContainer>

          <ToastContainer />
          <div>
            
            <form onSubmit={handleSubmit}>
              <h1>Request Form</h1>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="Enter First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <label htmlFor="emailAddress">Email Address:</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phone}
                placeholder="Enter Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <label htmlFor="streetAddress1">Street Address 1:</label>
              <input
                type="text"
                id="streetAddress1"
                name="streetAddress1"
                value={streetAddress}
                placeholder="Enter Street Address"
                onChange={(e) => setStreetAddress(e.target.value)}
                required
              />

              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                placeholder="Enter City"
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                placeholder="Enter State"
                onChange={(e) => setState(e.target.value)}
                required
              />

              <label htmlFor="zipCode">Zip Code:</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                placeholder="Enter Zip Code"
                onChange={(e) => setZipCode(e.target.value)}
                required
              />

              <br></br>
              <br></br>

              <input type="submit" value="Submit" />
            </form>
          </div>
        </MDBContainer>
      </motion.div>
    </motion.div>
  );
}
