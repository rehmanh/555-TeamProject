import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default function Scheduler() {
    const [requestId, setRequestId] = useState('');
    const [prefInstallStartDate, setPrefInstallStartDate] = useState('');
    const [prefInstallEndDate, setPrefInstallEndDate] = useState('');
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('https://m90c2ol29g.execute-api.us-east-1.amazonaws.com/UAT');
                if (response.status === 200) {
                    const data = response.data;
                    setRequests(data);
                } else {
                    console.error('Failed to fetch requests:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleRequestSubmit = async () => {
        if (!requestId || !prefInstallStartDate || !prefInstallEndDate) {
            toast.error('Please fill in all the fields');
            return;
        }

        if (new Date(prefInstallEndDate) < new Date(prefInstallStartDate)) {
            toast.error('Preferred Install End Date cannot be prior to Preferred Install Start Date');
            return;
        }

        const requestData = {
            request_id: requestId,
            pref_install_start_date: prefInstallStartDate,
            pref_install_end_date: prefInstallEndDate
        };
        console.log('Submitting request data:', requestData);

        try {
            const response = await axios.post('https://mtd7u2mqfg.execute-api.us-east-1.amazonaws.com/UAT', requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success('Request submitted successfully!');
                setRequestId('');
                setPrefInstallStartDate('');
                setPrefInstallEndDate('');
            } else {
                toast.error('Failed to submit request. Please try again.');
            }
        } catch (error) {
            // Error handling
            console.error('Error:', error);
            toast.error('Failed to submit request. Please try again.');
        }
    };

    return (
        <div>
            <h2>Submit Request</h2>
            <label>
                Request ID:
                <select
                    value={requestId}
                    onChange={(e) => setRequestId(e.target.value)}
                >
                    <option value="">Select Request ID</option>
                    {requests.map(request => (
                        <option key={request.request_id} value={request.request_id}>
                            {request.request_id}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Preferred Install Start Date:
                <input
                    type="datetime-local"
                    value={prefInstallStartDate}
                    onChange={(e) => setPrefInstallStartDate(e.target.value)}
                />
            </label>
            <br />
            <label>
                Preferred Install End Date:
                <input
                    type="datetime-local"
                    value={prefInstallEndDate}
                    onChange={(e) => setPrefInstallEndDate(e.target.value)}
                />
            </label>
            <br />
            <Button onClick={handleRequestSubmit}>Submit Request</Button>
            <ToastContainer />
        </div>
    );
};