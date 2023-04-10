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
    MDBTextArea
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
    const [cost, setCost] = useState("");
    const [duration, setDuration] = useState("");

    const handleChange = (event, requestId) => {
        if (event.target.checked) {
            selectedData.push({request_id: requestId, cost: null, duration: null });
            setSelectedData(selectedData);
        } else {
            const index = selectedData.findIndex((r) => r.request_id === requestId)
            if (index > -1){
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
        //onst updatedCost = [...selectedData]; // Create a copy of the requests array
        const index = selectedData.findIndex((r) => r.request_id === requestId);
        selectedData[index] = { ...selectedData[index], cost: value };
    };

    const handleDurationChange = (event, requestId) => {
        const value = event.target.value;
        //const updatedDuration = [...selectedData]; // Create a copy of the requests array
        const index = selectedData.findIndex((r) => r.request_id === requestId);
        selectedData[index] = { ...selectedData[index], duration: value };
    };


    const handleSubmit = () => {
        selectedItems.forEach((item) => {
            const { request_id } = item;
            axios.post("https://example.com/api", {
                request_id: request_id,
                price_est: cost,
                duration_est_days: duration
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            });
        });
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
                                                    placeholder="Cost Estimation"
                                                    onChange={(e) => {
                                                        handleCostChange(e, value.request_id);
                                                    }}>
                                                </MDBTextArea>
                                            </th>
                                            <th scope='col'>
                                                <MDBTextArea
                                                    rows="1"
                                                    placeholder="Duration Estimation"
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