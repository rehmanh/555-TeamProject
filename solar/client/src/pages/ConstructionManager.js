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

    // create state variables for the 3 tables that need to be shown, in order
    const [unassignedRequestData, setUnassignedRequestData] = useState();
    const [inProgressRequestData, setInProgressRequestData] = useState();
    const [siteSurveyors, setSiteSurveyors] = useState();

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
          fetch("https://5qi3g62xfd.execute-api.us-east-1.amazonaws.com/UAT"), // all site surveyors available
          fetch("https://8off7ckjwd.execute-api.us-east-1.amazonaws.com/UAT") // all in progress requests that have been assigned to a SS
        ])
          .then(([unassignedRequestsResponse, siteSurveyorsResponse, inProgressRequestsResponse]) =>
            Promise.all([unassignedRequestsResponse.json(), siteSurveyorsResponse.json(), inProgressRequestsResponse.json()])
          )
          .then(([dataUnassignedRequests, dataSiteSurveyors, dataInProgressRequests]) => {
            setUnassignedRequestData(dataUnassignedRequests)
            setSiteSurveyors(dataSiteSurveyors)
            setInProgressRequestData(dataInProgressRequests)
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
      {name: 'Street Address', selector: (row, i) => row.street_address1, center: true},
      {name: 'City', selector: (row, i) => row.city, center: true}
    ];

    const inProgressRequestsColumns = [
      {name: 'Request ID', selector: (row, i) => row.request_id, center: true},
      {name: 'Site Surveyor', selector: (row, i) => row.site_syr, center: true},
      {name: 'Date of request', selector: (row, i) => row.created_at_datetime, center: true},
      {name: 'Request Status', selector: (row, i) => row.request_status, center: true}
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

    const rowComponent = () => {
      return (
        <>
          <Button variant="primary">
            View Customer Pictures
          </Button>
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
                    columns={unassignedRequestsColumns}
                    data={unassignedRequestData}
                    fixedHeader
                    expandableRows
                    expandableRowsComponent={rowComponent}
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