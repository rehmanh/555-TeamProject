import SolarNavbar from '../pages/navbar'
import React, { Component, useEffect, useState } from "react";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol,
    MDBCheckbox,
    MDBBtn,
    MDBTextArea,
    MDBRadio
} from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify'
import axios from 'axios';
import './CoCheck.css';

export default function CoCheck() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://m90c2ol29g.execute-api.us-east-1.amazonaws.com/UAT')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    const [selectedData, setSelectedData] = useState([]);
    // const [cost, setCost] = useState("");
    // const [duration, setDuration] = useState("");

    const handleChange = (event, requestId) => {
        if (event.target.checked) {
            selectedData.push({ request_id: requestId });
            setSelectedData(selectedData);
        } else {
            const index = selectedData.findIndex((r) => r.request_id === requestId)
            if (index > -1) {
                selectedData.splice(index, 1);
            }
        }
    };

    const handleCheckboxChange = (selectedData) => {
        setSelectedData(selectedData);
        console.log(selectedData);
    };

    const handleCostChange = (event, requestId) => {
        const value = event.target.value;
        const index = selectedData.findIndex((r) => r.request_id === requestId);
        selectedData[index] = { ...selectedData[index], price_est: value };
    };

    const handleDurationChange = (event, requestId) => {
        const value = event.target.value;
        const index = selectedData.findIndex((r) => r.request_id === requestId);
        selectedData[index] = { ...selectedData[index], duration_est_days: value };
    };


    const handleSubmit = () => {
        try {
            validateCoManager();
        } catch (message) {
            toast.error(message);
            return;
        }
        selectedData.map((item) => {
            const json = JSON.stringify({
                request_id: item.request_id,
                price_est: parseFloat(item.price_est),
                duration_est_days: parseInt(item.duration_est_days)
            })
            console.log(json)
            axios
                .post("https://vlcfbqye7a.execute-api.us-east-1.amazonaws.com/UAT", json, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(response => {console.log(response.data)})
                .then((selectedData) => console.log(selectedData))
                .catch((error) => console.log(error))
        })
    };

    const validateCoManager = () => {
        if (localStorage.length === 0
            || localStorage.getItem('userId') === null
            || localStorage.getItem('roleId') === null
            || localStorage.getItem('token') === null) {
            throw "There was an error with the User for this request, please Log In and try again.";
        }
    };

    return (
        <div>
            <SolarNavbar />
            <>
                <MDBRow>
                    <MDBCol size='1'></MDBCol>
                    <MDBCol size='10'>
                        <MDBTabsContent>
                            <MDBTable className="table table-light table-bordered table-responsive table-hover">
                                <MDBTableHead dark>
                                    <tr>
                                        <th scope='col'>
                                            <MDBBtn rounded color='success' type='submit' onClick={handleSubmit}>Submit</MDBBtn>
                                        </th>
                                        <th>
                                            <span style={{ float: 'left' }}>Customer's Request ID</span>
                                        </th>
                                        <th>
                                            <span style={{ float: 'left' }}>Customer's First Name</span>
                                        </th>
                                        <th>
                                            <span style={{ float: 'left' }}>Customer's city</span>
                                        </th>
                                        <th>
                                            <span style={{ float: 'left' }}>Estimate Cost</span>
                                        </th>
                                        <th>
                                            <span style={{ float: 'left' }}>Estimate Duration</span>
                                        </th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {data.map((value) => (
                                        <tr key={value.request_id}>
                                            <th scope='col'>
                                                <MDBCheckbox
                                                    onClick={(e) => {
                                                        handleChange(e, value.request_id);
                                                        handleCheckboxChange(selectedData);
                                                    }}>
                                                </MDBCheckbox>
                                            </th>
                                            <td>{value.request_id}</td>
                                            <td>{value.first_name}</td>
                                            <td>{value.city}</td>
                                            <th scope='col'>
                                                <MDBTextArea
                                                    rows="1"
                                                    placeholder="$"
                                                    onChange={(e) => {
                                                        handleCostChange(e, value.request_id);
                                                    }}>
                                                </MDBTextArea>
                                            </th>
                                            <th scope='col'>
                                                <MDBTextArea
                                                    rows="1"
                                                    placeholder="days"
                                                    onChange={(e) => {
                                                        handleDurationChange(e, value.request_id);
                                                    }}>
                                                </MDBTextArea>
                                            </th>
                                        </tr >
                                    ))
                                    }
                                </MDBTableBody>
                            </MDBTable>
                        </MDBTabsContent>
                    </MDBCol>
                    <MDBCol size='1'></MDBCol>
                </MDBRow>
            </>
        </div>
    );
}