import 'bootstrap/dist/css/bootstrap.css';
import React, { Component, useEffect, useState } from "react";
import {
  MDBContainer,
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
import { toast } from 'react-toastify'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import { isUserLoggedIn } from '../utils/utils';


const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0 },
};

export default function App() {
  const [verticalActive, setVerticalActive] = useState('tab1');
  const [allRequests, setAllRequests] = useState();
  const [userRequests, setUserRequests] = useState();
  const [requests, setRequests] = useState([]);
  const [roleId, setRole] = useState(localStorage.getItem('roleId'));
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  const handleVerticalClick = (value = String) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

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

  const handleCheckboxSelection = (requests) => {
    setRequests(requests);
  };

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2 second delay before reload
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
            handleRefresh();
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
    if (!isLoggedIn) {
      throw "There was an error with the User for this request, please Log In and try again.";
    }
  };

  const redirectToHomePage = () => {
    sessionStorage.setItem('error', 'You are not authorized to view this page.')
    return <Navigate to='/' />
  };

  return (
    (roleId == 1 || roleId == 2) && isLoggedIn
      ? (<div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='Page'>
            <MDBContainer breakpoint="sm">
              <motion.div
                className="box"
                variants={boxVariant}
                initial="hidden"
                animate="visible"
              >

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
                          <MDBTableHead dark>
                            <tr>
                              <th scope='col'>
                                <Button variant="primary" type='submit' onClick={assignRequestToSalesRep}>Submit</Button>
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
              </motion.div>
            </MDBContainer>
          </div>
        </motion.div></div>) : redirectToHomePage()
  );
}

// function SalesRepTable({ data, handleCheckboxSelection, isUsersRequests }) {
//   const [requests, setRequests] = useState([]);

//   const handleChange = (event, requestId) => {
//     if (event.target.checked) {
//       requests.push(requestId);
//       setRequests(requests);
//     } else {
//       // check if state contains unchecked requestId
//       // and remove it
//       const index = requests.indexOf(requestId);
//       if (index > -1) {
//         requests.splice(index, 1);
//       }
//     }
//   };

//   return (
//     <>
//       {
//         data.map((value) => (
//           <tr key={value.sales_reps}>
//             <th scope='col'>
//               <MDBCheckbox onClick={(e) => {
//                 handleChange(e, value.request_id);
//                 handleCheckboxSelection(requests);
//               }}>
//               </MDBCheckbox>
//             </th>
//             <td>{value.request_id}</td>
//             <td>{value.first_name}</td>
//             <td>{value.city}</td>
//             {
//               isUsersRequests ? <td>{value.current_stage}</td> : <></>
//             }
//           </tr>
//         ))
//       }
//     </>
//   );
// }

function SalesRepTable({ data, handleCheckboxSelection, isUsersRequests }) {
  const [selectedRequests, setSelectedRequests] = useState([]);

  const handleRowClick = (requestId) => {
    // check if the request ID is already selected
    const index = selectedRequests.indexOf(requestId);
    if (index > -1) {
      // request is already selected, so remove it from the list
      setSelectedRequests(selectedRequests.filter((id) => id !== requestId));
    } else {
      // request is not selected, so add it to the list
      setSelectedRequests([...selectedRequests, requestId]);
    }
  };

  useEffect(() => {
    handleCheckboxSelection(selectedRequests);
  }, [selectedRequests]);

  return (
    <>
      {data.map((value) => (
        <tr
          key={value.sales_reps}
          onClick={() => handleRowClick(value.request_id)}
          className={selectedRequests.includes(value.request_id) ? "table-primary" : ""}
        >
          <th scope="col">
            <MDBCheckbox
              checked={selectedRequests.includes(value.request_id)}
              onChange={() => { }}
            ></MDBCheckbox>
          </th>
          <td>{value.request_id}</td>
          <td>{value.first_name}</td>
          <td>{value.city}</td>
          {isUsersRequests ? <td>{value.current_stage}</td> : <></>}
        </tr>
      ))}
    </>
  );
}

