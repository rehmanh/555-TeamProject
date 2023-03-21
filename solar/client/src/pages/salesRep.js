import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../pages/navbar'
// import React, { useState, useEffect, useReducer } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import React, { Component, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { ThemeConsumer } from 'styled-components';
import axios from 'axios';

export default function App() {
  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value= String) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  const [data, setData] = useState();

  useEffect(() => {
      fetch("https://h0pt17fv6g.execute-api.us-east-1.amazonaws.com/UAT").then((data) => {
          return data.json(); // Converted data to object
      }).then((objectData) => {
          setData(objectData.body.sales_reps);
      }, [])    
  }, []);

  const [requests, setRequests] = useState([]);
  
  const handleCheckboxSelection = (requests) => {
    setRequests(requests);
  };

  const assignRequestToSalesRep = () => {
    if (requests !== null && requests.length > 0) {
      const json = JSON.stringify({
        request_id_list: requests,
        sales_rep_id: 99999
      });
      axios
        .post("https://045zhv1hwl.execute-api.us-east-1.amazonaws.com/UAT", json, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
    } else {
      // TODO insert the toastify message here
      console.log("there are no requests");
    }
  };

  return (
    <div>
        <Navbar />
    <>
      <MDBRow>
        <MDBCol size='2'>
          <MDBTabs pills className='flex-column text-center'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                Requests
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
              Approved Requests
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
              On going Projects
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === 'tab1'}>
              <h1>
                <MDBBtn>Refresh</MDBBtn>
              </h1>
                <MDBTable className = "table table-light table-bordered table-responsive table-hover">
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'>
                                    <MDBBtn rounded color='success' type='submit' onClick={assignRequestToSalesRep}>Submit</MDBBtn>
                                </th>
                                <th>Customer's Request ID</th>
                                <th>Customer's First Name</th>
                                <th>Customer's city</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                data && <SalesRepTable data={data} handleCheckboxSelection={handleCheckboxSelection}/>
                            }
                        </MDBTableBody>
                    </MDBTable>
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}>Clients</MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab3'}>On going Projects</MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </>
    </div>
  );
}

function SalesRepTable({data, handleCheckboxSelection}) {
  const [requests, setRequests] = useState([]);

  const handleChange = (event, requestId) => {
    if (event.target.checked) {
      requests.push(requestId);
      setRequests(requests); 
    } else {
      // check if state contains unchecked requestId
      // and remove it
      const index = requests.indexOf(requestId);
      if (index > -1) {
        requests.splice(index, 1);
      }
    }
  };

  return (
      <>
      {
          data.map((value) => (
              <tr key = {value.sales_reps}>
                  <th scope='col'>
                      <MDBCheckbox onClick={(e) => {
                        handleChange(e, value.request_id); 
                        handleCheckboxSelection(requests);
                      }}></MDBCheckbox>
                  </th>
                  <td>{value.request_id}</td>   
                  <td>{value.first_name}</td>
                  <td>{value.city}</td>
              </tr>
          ))
      }
      </>
  );
}

