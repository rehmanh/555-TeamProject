import 'bootstrap/dist/css/bootstrap.css';
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../pages/navbar'
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import LineChart from '../components/LineChart'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
import '../css/opManager.css'
import { toast } from 'react-toastify'

import { BsHammer, BsFlagFill, BsClipboard2CheckFill, BsClipboard2PlusFill } from "react-icons/bs";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,

  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
export default function OpManager() {
  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value = String) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  const [allRequests, setAllRequests] = useState();
  const [userRequests, setUserRequests] = useState();

  useEffect(() => {
    Promise.all([
      fetch("https://h0pt17fv6g.execute-api.us-east-1.amazonaws.com/UAT"),
      fetch("https://lwwzhr7ifi.execute-api.us-east-1.amazonaws.com/UAT", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "sales_rep_id": localStorage.getItem('userId') })
      })
    ])
      .then(([allRequestsResponse, userRequestsResponse]) =>
        Promise.all([allRequestsResponse.json(), userRequestsResponse.json()])
      )
      .then(([dataAllRequests, dataUserRequests]) => {
        setAllRequests(dataAllRequests.body.sales_reps);
        setUserRequests(dataUserRequests);
      });
  }, []);

  const [requests, setRequests] = useState([]);

  const handleCheckboxSelection = (requests) => {
    setRequests(requests);
  };

  const assignRequestToSalesRep = () => {
    try {
      validateSalesRepUser();
    } catch (message) {
      toast.error(message);
      return;
    }

    if (requests !== null && requests.length > 0) {
      const json = JSON.stringify({
        request_id_list: requests,
        sales_rep_id: localStorage.getItem('userId')
      });
      axios
        .post("https://045zhv1hwl.execute-api.us-east-1.amazonaws.com/UAT", json, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response && response.status === 200) {
            toast.success(`Successfully assigned Requests: ${requests} to your profile!`)
          } else if (response && response.status in [400, 404]) {
            toast.error('There was an issue with your Request. Please contact IT for support.')
          } else {
            toast.error('There was an issue with the Request API. Please try again later.')
          }
        })
    } else {
      toast.error('Please use the checkboxes to specify which Requests you would like to assign to your Profile.')
    }
  };

  const validateSalesRepUser = () => {
    if (localStorage.length === 0
      || localStorage.getItem('userId') === null
      || localStorage.getItem('roleId') === null
      || localStorage.getItem('token') === null) {
      throw "There was an error with the User for this request, please Log In and try again.";
    }
  };

  return (
    <div>
      <Navbar />
      <h1>
        Welcome back Operation Manager!
      </h1>
      <MDBContainer breakpoint="sm">
        <MDBRow className="mt-4">
          <MDBCol sm='4'>
            <MDBCard>


              <MDBCardBody>
                <MDBCardTitle><BsClipboard2CheckFill />  Sales Obtained</MDBCardTitle>
                <MDBCardText>
                  <span>
                    211
                  </span>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm='4'>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle><BsClipboard2PlusFill />  New Clients</MDBCardTitle>
                <MDBCardText>
                  <span>
                    313
                  </span>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm='4'>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle> <BsHammer />  Projects</MDBCardTitle>
                <MDBCardText>
                  <span>
                    212
                  </span>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol sm='6'>
            <MDBCard>
              <BarChart />
              {/* <MDBCardBody>
                <MDBCardTitle>New Requests</MDBCardTitle>
                <MDBCardText>
                  1
                </MDBCardText>
              </MDBCardBody> */}
            </MDBCard>
          </MDBCol>
          <MDBCol sm='6'>
            <MDBRow >
              <MDBCol>
                <MDBCard>
                  <PieChart />
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mt-4">
              <MDBCol>
                <MDBCard>
                  <LineChart />
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol sm={12}>
            <MDBCard>
              <MDBRow>
                <MDBCol size='1'></MDBCol>
                <MDBCol size='10'>
                  <MDBTabs fill className='mt-3'>
                    <MDBTabsItem>
                      <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                        All Requests
                      </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                      <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                        Your Requests
                      </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                      <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
                        Active Requests
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBTabs>

                  <MDBTabsContent>
                    <MDBTabsPane show={verticalActive === 'tab1'}>
                      <MDBTable className="table table-light table-bordered table-responsive table-hover">
                        <MDBTableHead dark style={{ top: '0', position: 'sticky' }}>
                          <tr>
                            <th scope='col'>
                              <MDBBtn rounded color='success' type='submit' onClick={assignRequestToSalesRep}>Submit</MDBBtn>
                            </th>
                            <th>
                              <span style={{ float: 'left' }}>Customer's Request ID</span>
                            </th>
                            <th>
                              <span style={{ float: 'left' }}>Customer's First Name</span>
                            </th>
                            <th>
                              <span style={{ float: 'left' }}>Customer's city</span>
                              <span style={{ float: 'right' }}><MDBBtn>Refresh</MDBBtn></span>
                            </th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {
                            allRequests &&
                            <SalesRepTable
                              data={allRequests}
                              handleCheckboxSelection={handleCheckboxSelection}
                              isUsersRequests={false} />
                          }
                        </MDBTableBody>
                      </MDBTable>
                    </MDBTabsPane>

                    <MDBTabsPane show={verticalActive === 'tab2'}>
                      <MDBTable className="table table-light table-bordered table-responsive table-hover">
                        <MDBTableHead dark>
                          <tr>
                            <th scope='col'>

                            </th>
                            <th>Customer's Request ID</th>
                            <th>Customer's First Name</th>
                            <th>Customer's City</th>
                            <th>Request Status</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {
                            userRequests && userRequests.length !== 0
                              ? <SalesRepTable data={userRequests} handleCheckboxSelection={handleCheckboxSelection} isUsersRequests={true} />
                              : <></>
                          }
                        </MDBTableBody>
                      </MDBTable>
                      {
                        // this is bad, but hopefully it works
                        !userRequests || userRequests.length === 0
                          ? <div style={{ textAlign: 'center' }}>You do not have any Requests assigned to you yet...</div>
                          : <></>
                      }
                    </MDBTabsPane>

                    <MDBTabsPane show={verticalActive === 'tab3'}>On going Projects</MDBTabsPane>
                  </MDBTabsContent>
                </MDBCol>
                <MDBCol size='1'></MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>


      {/* <Container>
      <Row>
        <Col>
          <Card style={{ height: '30vw',width: '30vw'}}>
            <Card.Body>
              <Card.Title ><FaBeer />Sales</Card.Title>
              <Card.Text>
                24
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '30vw',width: '30vw'}}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>In progresse</Card.Title>
              <Card.Text>
                22
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '30vw',width: '30vw'}}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Total projects</Card.Title>
              <Card.Text>
                100
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Card style={{ height: '30vw',width: '30vw'}}>
            <LineChart />
          </Card>
        </Col >
        <Col xs={6}>
          <LineChart />
        </Col>
      </Row >
      < Row >
        < Col xs={3}>
          <BarChart />
        </Col>
        <Col xs={6}>
          <PieChart />
        </Col>
      </Row>
    </Container> */}
    </div >
  )
}

function SalesRepTable({ data, handleCheckboxSelection, isUsersRequests }) {
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
          <tr key={value.sales_reps}>
            <th scope='col'>
              <MDBCheckbox onClick={(e) => {
                handleChange(e, value.request_id);
                handleCheckboxSelection(requests);
              }}>
              </MDBCheckbox>
            </th>
            <td>{value.request_id}</td>
            <td>{value.first_name}</td>
            <td>{value.city}</td>
            {
              isUsersRequests ? <td>{value.current_stage}</td> : <></>
            }
          </tr>
        ))
      }
    </>
  );
}
