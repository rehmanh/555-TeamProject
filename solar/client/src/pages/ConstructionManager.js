import 'bootstrap/dist/css/bootstrap.css';
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  MDBTable,
  MDBTableBody, 
  MDBTableHead
} from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify'
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import { getUserFullName } from '../utils/utils';
import axios from 'axios';
import ImageRetrieve from '../components/imageRetrive';


export default function ConstructionManager() {

    const [roleId, setRole] = useState(localStorage.getItem('roleId'));
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage !== null
        && localStorage.getItem('token') !== null
        && localStorage.getItem('roleId') !== null
        && localStorage.getItem('userId') !== null);
    
    const [fullUserName, setFullUserName] = useState('');
    
    useEffect(() => {
      setFullUserName(getUserFullName)
    }, []);

    const [verticalActive, setVerticalActive] = useState('tab1');

    // modal related stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowModal = () => setShow(true);

    const [showImages, setShowImages] = useState(false);
    const handleCloseImages = () => setShowImages(false);
    const handleShowImages = () => setShowImages(true);

    const [showEstimates, setShowEstimates] = useState(false);
    const handleCloseEstimates = () => setShowEstimates(false);
    const handleShowEstimates = () => setShowEstimates(true);

    // create state variables for the 3 tables that need to be shown, in order
    const [unassignedRequestData, setUnassignedRequestData] = useState();
    const [inProgressRequestData, setInProgressRequestData] = useState();
    const [siteSurveyors, setSiteSurveyors] = useState();
    const [completedRequests, setCompletedRequests] = useState()

    // function to pre-fetch the table data
    useEffect(() => {
        Promise.all([
          fetch("https://szmu1lpz65.execute-api.us-east-1.amazonaws.com/UAT", { // all requests for THIS conman
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ "const_mgr": "C1" }) // TODO change to localStorage userID
          }), 
          fetch("https://5qi3g62xfd.execute-api.us-east-1.amazonaws.com/UAT"), // get all site surveyors
          fetch("https://rjfvi098o7.execute-api.us-east-1.amazonaws.com/UAT", { // all requests assigned to SS by this conman
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ "const_mgr": "C1" }) // TODO change to localStorage userID
          }), 
          fetch("https://cbayjavixk.execute-api.us-east-1.amazonaws.com/UAT", { // all COMPLETED requests by SS
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ "const_mgr": "C1" })
          }) 
        ])
          .then(([unassignedRequestsResponse, siteSurveyorsResponse, inProgressRequestsResponse, completedRequestsResponse]) =>
            Promise.all([unassignedRequestsResponse.json(), siteSurveyorsResponse.json(), inProgressRequestsResponse.json(), completedRequestsResponse.json()])
          )
          .then(([dataUnassignedRequests, dataSiteSurveyors, dataInProgressRequests, dataCompletedRequests]) => {
            setUnassignedRequestData(dataUnassignedRequests)
            setSiteSurveyors(dataSiteSurveyors)
            setInProgressRequestData(dataInProgressRequests)
            setCompletedRequests(dataCompletedRequests)
          })
    }, []);

    const handleVerticalClick = (value = String) => {
      if (value === verticalActive) {
        return;
      }
      setVerticalActive(value);
    };

    const unassignedRequestsColumns = [
      {name: 'Request ID', selector: (row, i) => row.request_id, center: true },
      {name: 'First Name', selector: (row, i) => row.first_name, center: true},
      {name: 'Zip Code', selector: (row, i) => row.zip_code, center: true},
      {name: 'City', selector: (row, i) => row.city, center: true}
    ];

    const inProgressRequestsColumns = [
      {name: 'Request ID', selector: (row, i) => row.request_id, center: true},
      {name: 'Site Surveyor', selector: (row, i) => row.site_syr, center: true},
      {name: 'First Name', selector: (row, i) => row.first_name, center: true}, 
      {name: 'Street Address', selector: (row, i) => row.street_address1, center: true},
      {name: 'Zip Code', selector: (row, i) => row.zip_code, center: true},
      {name: 'City', selector: (row, i) => row.city, center: true}
    ];

    const completedRequestColumns = [
      {name: 'Request ID', selector: (row, i) => row.request_id, center: true},
      {name: 'Site Surveyor', selector: (row, i) => row.site_syr, center: true},
      {name: 'First Name', selector: (row, i) => row.first_name, center: true}, 
      {name: 'Street Address', selector: (row, i) => row.street_address1, center: true},
      {name: 'Zip Code', selector: (row, i) => row.zip_code, center: true},
      {name: 'City', selector: (row, i) => row.city, center: true}
    ];

    const [selectedValue, setSelectedValue] = useState('');
    const handleDropDownChanged = (event) => {
      setSelectedValue(event.target.value)
    };

    const [selectedRows, setSelectedRows] = useState([]);
    const handleRowSelected = (event) => {
      setSelectedRows(event.selectedRows)
    };

    const unassignedContextActions = useMemo(() => {
      const handleSelection = (val) => {
        const request_ids = selectedRows.map((row) => row.request_id)
        const json = JSON.stringify({
          site_syr: val,
          request_ids: request_ids
        });
        axios
          .post('https://o9hbedj0ne.execute-api.us-east-1.amazonaws.com/UAT', json, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            if (response && response.status === 200) {
              toast.success(`Successfully assigned ${request_ids} to Site Surveyor: ${val}!`)
            } else if (response && response.status in [400, 404]) {
              toast.error('There was an error with your Request. Please contact IT for support.')
            } else {
              toast.error('There was an error with our services. Please try again later.')
            }
          })
        setShow(false)
      };
      return (
        <>
        <Button variant="primary" onClick={handleShowModal}>
          Assign To Site Surveyor
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form.Select value={selectedValue} onChange={handleDropDownChanged}>
              {
                siteSurveyors &&
                siteSurveyors.map(val => (
                  <option key={val.site_syr} value={val.site_syr}> {val.site_syr} </option>
                ))
              }
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleSelection(selectedValue)}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      );
    });

    const ExpandedComponent = ({data}) => {

      const json = {
        request_id: data.request_id
      }

      const handleEstimateUpdated = () => {
        axios
          .post("https://vlcfbqye7a.execute-api.us-east-1.amazonaws.com/UAT", JSON.stringify(json), {
              headers: {
                  "Content-Type": "application/json",
              }
          })
          .then((response) => { 
            if (response && response.status === 200) {
              toast.success(`Successfully updated price estimate and duration estimate for request: ${data.request_id}!`)
            } else if (response && response.status in [400, 404]) {
              toast.error('There was an error with your Request. Please contact IT for support.')
            } else {
              toast.error('There was an error with our services. Please try again later.')
            }
          })
          .catch((error) => console.log(error))
        setShowEstimates(false)
      }

      const handleCostChange = (event) => {
        const value = event.target.value;
        json.price_est = value;
      };

      const handleDurationChange = (event) => {
        const value = event.target.value;
        json.duration_est_days = value;
      };

      return (
        <>
        <MDBRow center style={{padding: "5px"}}>
        <MDBCol size='3'></MDBCol>
        <MDBCol size='6' style={{textAlign: "center"}}>
          <Button variant="primary" onClick={handleShowImages}>View Customer Images</Button>
          &nbsp;
          <Button variant="primary" onClick={handleShowEstimates}>Add Estimates To Request</Button>

          <Modal show={showImages} onHide={handleCloseImages}>
            <Modal.Body>
              <ImageRetrieve request={data.request_id} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseImages}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showEstimates} onHide={handleCloseEstimates}>
            <Modal.Body>
              
                <Form.Group className="mb-3">
                  <Form.Label>Price Estimate</Form.Label>
                  <Form.Control type="number" placeholder="Enter price estimate ($)" onChange={(e) => {handleCostChange(e)}} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Duration Estimate</Form.Label>
                  <Form.Control type="number" placeholder="Enter estimated duration (days)" onChange={(e) => {handleDurationChange(e)}} />
                </Form.Group>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEstimates}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleEstimateUpdated()}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          
        </MDBCol>
        <MDBCol size='3'></MDBCol>
        </MDBRow>
        </>
      );
    }; 

    return (
        (roleId == 1) && isLoggedIn ?
        (    
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
        <>
          <MDBRow style={{ marginTop: '50px' }}>
            <h1>Welcome Back {fullUserName}</h1>
          </MDBRow>
            
          <MDBRow>
            <MDBCol size='1'></MDBCol>
            <MDBCol size='10'>

              <MDBTabs fill className='mt-3'>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                    Unassigned Requests
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                    Site Surveyor &#8212; In Progress Requests
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
                    Site Surveyor &#8212; Completed Requests
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                {/* Unassigned Requests */}
                <MDBTabsPane show={verticalActive === 'tab1'}>
                  <DataTable 
                    title=" "
                    columns={unassignedRequestsColumns}
                    data={unassignedRequestData}
                    contextActions={unassignedContextActions}
                    onSelectedRowsChange={handleRowSelected}
                    selectableRows
                    fixedHeader
                    />
                </MDBTabsPane>

                {/* In Progress Requests */}
                <MDBTabsPane show={verticalActive === 'tab2'}>
                  <DataTable
                    title=" "
                    columns={inProgressRequestsColumns}
                    data={inProgressRequestData}
                    fixedHeader
                    />
                </MDBTabsPane>
                
                <MDBTabsPane show={verticalActive === 'tab3'}>
                  <DataTable
                    title=" "
                    columns={completedRequestColumns}
                    data={completedRequests}
                    fixedHeader
                    expandableRows
                    expandableRowsComponent={ ExpandedComponent }
                    />
                </MDBTabsPane>

              </MDBTabsContent>
            </MDBCol>
            <MDBCol size='1'></MDBCol>
          </MDBRow>
        </>
      </motion.div>) : (<div>Invalid</div>)
    );
}