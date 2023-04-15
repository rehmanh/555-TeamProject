import React, { useState } from 'react';

export default function EmailForm() {
    const [email, setEmail] = useState('');

    // Event handlers for input changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Event handler for form submission
    const handleSubmit = () => {
        // Trigger API request to send email
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
    };
    return (
        <div>
            <h1>Send Email</h1>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
            <br />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};