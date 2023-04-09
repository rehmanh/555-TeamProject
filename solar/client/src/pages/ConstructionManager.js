import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useMemo, useState } from "react";
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
          fetch("https://8off7ckjwd.execute-api.us-east-1.amazonaws.com/UAT"), // all requests for THIS conman
          fetch("https://bkpqz1ao2e.execute-api.us-east-1.amazonaws.com/UAT"), // all site surveyors available
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
      {name: 'Last Name', selector: (row, i) => row.last_name, center: true},
      {name: 'Sales Rep Assigned', selector: (row, i) => row.sales_rep_id, center: true},
      {name: 'Date of request', selector: (row, i) => row.created_at_datetime, center: true},
      {name: 'Request Status', selector: (row, i) => row.request_status, center: true},
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

    const unassignedContextActions = useMemo(() => {
      const handleSelection = (val) => {
        // TODO implement assigning requests to sitesurveyor
        toast.warn(`You want to assign to ${val} but this feature has not been implemented yet!`)
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
                  <option key={val.const_mgr} value={val.const_mgr}> {val.const_mgr} </option>
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
                    expandableRows
                    />
                </MDBTabsPane>
                
                <MDBTabsPane show={verticalActive === 'tab3'}>
                  show table 3
                </MDBTabsPane>

              </MDBTabsContent>
            </MDBCol>
            <MDBCol size='1'></MDBCol>
          </MDBRow>
        </>
      </motion.div>) : (<div>Invalid</div>)
    );
}