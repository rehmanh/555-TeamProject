import 'bootstrap/dist/css/bootstrap.css';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  MDBContainer,
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
import { getUserFullName, getUserId, isUserLoggedIn } from '../utils/utils';
import { ImgUp } from '../components/imageUpload';
import ImageRetrieve from '../components/imageRetrive'

const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0 },
};
export default function SiteSurveyor() {

  const [roleId, setRole] = useState(localStorage.getItem('roleId'));

  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  const [fullUserName, setFullUserName] = useState('');

  useEffect(() => {
    setFullUserName(getUserFullName)
  }, []);

  const [verticalActive, setVerticalActive] = useState('tab1');

  // modal related stuff
  const [showImages, setShowImages] = useState(false);
  const handleCloseImages = () => setShowImages(false);
  const handleShowImages = () => setShowImages(true);

  // modal 2 stuff
  const [showImages2, setShowImages2] = useState(false);
  const handleCloseImages2 = () => setShowImages2(false);
  const handleShowImages2 = () => setShowImages2(true);

  // data for table 1
  const [newRequestData, setNewRequestData] = useState();

  // data for table 2
  const [updateRequestData, setUpdatedRequestData] = useState();

  const userId = localStorage.getItem('userId')

  // function to pre-fetch the table data
  useEffect(() => {
    Promise.all([
      fetch("https://f3gpqtg8zb.execute-api.us-east-1.amazonaws.com/UAT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "site_syr": userId })
      }),
      fetch("https://xzddl2hpsg.execute-api.us-east-1.amazonaws.com/UAT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "site_syr": userId })
      })
    ])
      .then(([newRequestsDataResponse, updateRequestDataResponse]) =>
        Promise.all([newRequestsDataResponse.json(), updateRequestDataResponse.json()])
      )
      .then(([dataNewRequests, dataUpdateRequest]) => {
        setNewRequestData(dataNewRequests)
        setUpdatedRequestData(dataUpdateRequest)
      })
  }, []);

  const handleVerticalClick = (value = String) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  const newRequestsColumns = [
    { name: 'Request ID', selector: (row, i) => row.request_id, center: true },
    { name: 'First Name', selector: (row, i) => row.first_name, center: true },
    { name: 'Status', selector: (row, i) => row.request_status, center: true },
    { name: 'Street Address', selector: (row, i) => row.street_address1, center: true },
    { name: 'Zip Code', selector: (row, i) => row.zip_code, center: true }
  ];

  const updatedRequestsColumns = [
    { name: 'Request ID', selector: (row, i) => row.request_id, center: true },
    { name: 'First Name', selector: (row, i) => row.first_name, center: true },
    { name: 'Status', selector: (row, i) => row.request_status, center: true },
    { name: 'Street Address', selector: (row, i) => row.street_address1, center: true },
    { name: 'Zip Code', selector: (row, i) => row.zip_code, center: true }
  ];

  const ExpandedComponent = ({ data }) => {
    return (
      <>
        <MDBRow center style={{ padding: "5px" }}>
          <MDBCol size='3'></MDBCol>
          <MDBCol size='6' style={{ textAlign: "center" }}>
            <Button variant="primary" onClick={handleShowImages}>Upload Customer Images</Button>

            <Modal show={showImages} onHide={handleCloseImages}>
              <Modal.Body>
                <ImgUp request={data.request_id} siteSurveyor={userId} />
              </Modal.Body>
            </Modal>

          </MDBCol>
          <MDBCol size='3'></MDBCol>
        </MDBRow>
      </>
    );
  };

  const ExpandedComponent2 = ({ data }) => {
    return (
      <>
        <MDBRow center style={{ padding: "5px" }}>
          <MDBCol size='3'></MDBCol>
          <MDBCol size='6' style={{ textAlign: "center" }}>
            <Button variant="primary" onClick={handleShowImages2}>View Customer Images</Button>

            <Modal show={showImages2} onHide={handleCloseImages2}>
              <Modal.Body>
                <ImageRetrieve request={data.request_id} />
              </Modal.Body>
            </Modal>

          </MDBCol>
          <MDBCol size='3'></MDBCol>
        </MDBRow>
      </>
    );
  };

  return (
    (roleId == 1 || roleId == 6 || roleId == 7) && isLoggedIn ?
      (
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
                        expandableRowsComponent={ExpandedComponent}
                        fixedHeader
                      />
                    </MDBTabsPane>

                    {/* Completed Requests*/}
                    <MDBTabsPane show={verticalActive === 'tab2'}>
                      <DataTable
                        title=" "
                        columns={updatedRequestsColumns}
                        data={updateRequestData}
                        fixedHeader
                        expandableRows
                        expandableRowsComponent={ExpandedComponent2}
                      />
                    </MDBTabsPane>

                  </MDBTabsContent>
                </MDBCol>
                <MDBCol size='1'></MDBCol>
              </MDBRow>
            </motion.div>
          </MDBContainer>
          </div>
        </motion.div>) : (<div>Invalid</div>)
  );
}