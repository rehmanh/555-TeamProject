import 'bootstrap/dist/css/bootstrap.css';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { getUserFullName } from '../utils/utils';
import { ImgUp } from '../components/imageUpload';


export default function SiteSurveyor() {

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
    const [showImages, setShowImages] = useState(false);
    const handleCloseImages = () => setShowImages(false);
    const handleShowImages = () => setShowImages(true);

    // data for table 1
    const [newRequestData, setNewRequestData] = useState();


    // function to pre-fetch the table data
    useEffect(() => {
        Promise.all([
            fetch("https://fkj7pxrlob.execute-api.us-east-1.amazonaws.com/UAT", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "site_syr": "SS1" }) //TODO: change this to userID
            })
        ])
        .then(([newRequestsDataResponse]) => 
            Promise.all([newRequestsDataResponse.json()])
        )
        .then(([dataNewRequests]) =>
            setNewRequestData(dataNewRequests)
        )
    }, []);

    const handleVerticalClick = (value = String) => {
      if (value === verticalActive) {
        return;
      }
      setVerticalActive(value);
    };

    const newRequestsColumns = [
        {name: 'Request ID', selector: (row, i) => row.request_id, center: true },
        {name: 'First Name', selector: (row, i) => row.first_name, center: true},
        {name: 'Status', selector: (row, i) => row.request_status, center: true},
        {name: 'Street Address', selector: (row, i) => row.street_address1, center: true},
        {name: 'Zip Code', selector: (row, i) => row.zip_code, center: true}
    ];

    const ExpandedComponent = ({data}) => {
      return (
        <>
        <MDBRow center style={{padding: "5px"}}>
        <MDBCol size='3'></MDBCol>
        <MDBCol size='6' style={{textAlign: "center"}}>
          <Button variant="primary" onClick={handleShowImages}>Upload Customer Images</Button>

          <Modal show={showImages} onHide={handleCloseImages}>
            <Modal.Body>
              <ImgUp request={data.request_id} siteSurveyor={"SS1"} /> {/* TODO change hardcoded value */}
            </Modal.Body>
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
                    In Progress Requests
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                    Completed Requests
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                {/* Assigned to Me requests */}
                <MDBTabsPane show={verticalActive === 'tab1'}>
                  <DataTable 
                    title=" "
                    columns={newRequestsColumns}
                    data={newRequestData}
                    expandableRows
                    expandableRowsComponent={ ExpandedComponent }
                    fixedHeader
                    />
                </MDBTabsPane>

                {/* Completed Requests*/}
                <MDBTabsPane show={verticalActive === 'tab2'}>
                    Completed Requests
                  {/* <DataTable
                    title=" "
                    columns={inProgressRequestsColumns}
                    data={inProgressRequestData}
                    fixedHeader
                    /> */}
                </MDBTabsPane>

              </MDBTabsContent>
            </MDBCol>
            <MDBCol size='1'></MDBCol>
          </MDBRow>
        </>
      </motion.div>) : (<div>Invalid</div>)
    );
}