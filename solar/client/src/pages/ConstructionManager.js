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
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { getUserFullName, getAuthToken, isUserLoggedIn } from '../utils/utils';
import axios from 'axios';
import ImageRetrieve from '../components/imageRetrive';


export default function ConstructionManager() {
  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500); // 2 second delay before reload
  };

  const [roleId, setRole] = useState(localStorage.getItem('roleId'));

  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  const [fullUserName, setFullUserName] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    setFullUserName(getUserFullName())
  }, []);

  const [verticalActive, setVerticalActive] = useState('tab1');
  const [currentRow, setCurrentRow] = useState(null);
  const [table4Row, setTable4Row] = useState(null);

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
  const [scheduledRequests, setScheduledRequests] = useState()

  const token = "Token " + getAuthToken()

  // function to pre-fetch the table data
  useEffect(() => {
    Promise.all([
      fetch("https://szmu1lpz65.execute-api.us-east-1.amazonaws.com/UAT", { // all requests for THIS conman
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "const_mgr": userId })
      }),
      fetch("/api/site-surveyors/", { // get all site surveyors
        method: "GET",
        headers: {
          "Authorization": token
        }
      }),
      fetch("https://8ioy3ejwke.execute-api.us-east-1.amazonaws.com/UAT", { // all requests assigned to SS by this conman
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "const_mgr": userId })
      }),
      fetch("https://cbayjavixk.execute-api.us-east-1.amazonaws.com/UAT", { // all COMPLETED requests by SS
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "const_mgr": userId })
      }),
      fetch("https://f44c8lswdj.execute-api.us-east-1.amazonaws.com/UAT", { // all scheduled requests for customers
        method: "POST",
        headers: {
          "Content-Type": "application.json"
        },
        body: JSON.stringify({ "const_mgr": userId })
      })
    ])
      .then(([unassignedRequestsResponse, siteSurveyorsResponse, inProgressRequestsResponse, completedRequestsResponse, scheduledRequestsResponse]) =>
        Promise.all([unassignedRequestsResponse.json(), siteSurveyorsResponse.json(), inProgressRequestsResponse.json(), completedRequestsResponse.json(), scheduledRequestsResponse.json()])
      )
      .then(([dataUnassignedRequests, dataSiteSurveyors, dataInProgressRequests, dataCompletedRequests, dataScheduledRequests]) => {
        setUnassignedRequestData(dataUnassignedRequests)
        setSiteSurveyors(dataSiteSurveyors)
        setInProgressRequestData(dataInProgressRequests)
        setCompletedRequests(dataCompletedRequests)
        setScheduledRequests(dataScheduledRequests)
      })
  }, []);

  const handleVerticalClick = (value = String) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  const unassignedRequestsColumns = [
    { name: 'Request ID', selector: (row, i) => row.request_id, center: true, cell: (row) => <div className="col-text">{row.request_id}</div> },
    { name: 'First Name', selector: (row, i) => row.first_name, center: true, cell: (row) => <div className="col-text">{row.first_name}</div> },
    { name: 'City', selector: (row, i) => row.city, center: true, cell: (row) => <div className="col-text">{row.city}</div> }
  ];

  const inProgressRequestsColumns = [
    { name: 'Request ID', selector: (row, i) => row.request_id, center: true },
    {
      name: 'Site Surveyor', selector: (row, i) =>
        (siteSurveyors && siteSurveyors.filter((s) => s.id == row.site_syr)[0].first_name + ' ' + siteSurveyors.filter((s) => s.id == row.site_syr)[0].last_name),
      center: true
    },
    { name: 'First Name', selector: (row, i) => row.first_name, center: true },
    { name: 'Street Address', selector: (row, i) => row.street_address1, center: true },
    { name: 'Zip Code', selector: (row, i) => row.zip_code, center: true },
    { name: 'City', selector: (row, i) => row.city, center: true }
  ];

  const completedRequestColumns = [
    { name: 'Request ID', selector: (row, i) => row.request_id, center: true },
    {
      name: 'Site Surveyor', selector: (row, i) =>
        (siteSurveyors && siteSurveyors.filter((s) => s.id == row.site_syr)[0].first_name + ' ' + siteSurveyors.filter((s) => s.id == row.site_syr)[0].last_name),
      center: true
    },
    { name: 'First Name', selector: (row, i) => row.first_name, center: true },
    { name: 'Street Address', selector: (row, i) => row.street_address1, center: true },
    { name: 'Site Surveyor Comments', selector: (row, i) => row.site_svr_comm, center: true }
  ];

  const scheduledRequestsColumns = [
    { name: 'Request ID', selector: (row, i) => row.request_id, center: true },
    {
      name: 'Site Surveyor', selector: (row, i) =>
        (siteSurveyors && siteSurveyors.filter((s) => s.id == row.site_syr)[0].first_name + ' ' + siteSurveyors.filter((s) => s.id == row.site_syr)[0].last_name),
      center: true
    },
    { name: 'First Name', selector: (row, i) => row.first_name, center: true },
    { name: 'Street Address', selector: (row, i) => row.street_address1, center: true },
    { name: 'Zip Code', selector: (row, i) => row.zip_code, center: true },
    { name: 'City', selector: (row, i) => row.city, center: true },
    { name: 'Install Start', selector: (row, i) => row.pref_install_start_date, center: true },
    { name: 'Install End', selector: (row, i) => row.pref_install_end_date, center: true }
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
            handleRefresh();
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
              <option>Select</option>
              {
                siteSurveyors &&
                siteSurveyors.map(val => (
                  <option key={val.id} value={val.id}> {val.first_name + " " + val.last_name} </option>
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

  const SiteSurveyorCompletedComponent = ({ data }) => {
    const json = {
      request_id: data.request_id,
      email_address: data.email_address,
      first_name: data.first_name
    }

    const handleEstimateUpdated = () => {
      handleCloseEstimates()
      axios
        .post("https://vlcfbqye7a.execute-api.us-east-1.amazonaws.com/UAT", JSON.stringify(json), {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((response) => {
          if (response && response.status === 200) {
            toast.success(`Successfully updated price estimate and duration estimate for request: ${data.request_id}!`)
            handleRefresh();
          } else if (response && response.status in [400, 404]) {
            toast.error('There was an error with your Request. Please contact IT for support.')
          } else {
            toast.error('There was an error with our services. Please try again later.')
          }
        })
        .catch((error) => console.log(error))
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
        <MDBRow center style={{ padding: "5px" }}>
          <MDBCol size='3'></MDBCol>
          <MDBCol size='6' style={{ textAlign: "center" }}>
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

                <InputGroup className="mb-3">
                  <Form.Control type="number" placeholder="Enter price estimate" onChange={(e) => { handleCostChange(e) }} />
                  <InputGroup.Text id="basic-addon2">USD ($)</InputGroup.Text>
                </InputGroup>

                <InputGroup className="mb-3">
                  <Form.Control type="number" placeholder="Enter estimated duration" onChange={(e) => { handleDurationChange(e) }} />
                  <InputGroup.Text id="basic-addon2">Num. Working Days</InputGroup.Text>
                </InputGroup>

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

  const CustomerScheduledComponent = ({ data }) => {
    const json = {
      request_id: data.request_id
    }

    const markRequestDone = () => {
      axios.post("https://4ilts8r4oa.execute-api.us-east-1.amazonaws.com/UAT", JSON.stringify(json), {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          if (response && response.status === 200) {
            toast.success(`Successfully marked the request ${data.request_id} as Done!`)
            handleRefresh();
          } else if (response && response.status in [400, 404]) {
            toast.error('There was an error with your request. Please contact IT for support.')
          } else {
            toast.error('There was an error with our services. Please try again later.')
          }
        })
        .catch((error) => console.log(error))
    }

    return (
      <>
        <MDBRow center style={{ padding: "5px" }}>
          <MDBCol size='3'></MDBCol>
          <MDBCol size='6' style={{ textAlign: "center" }}>
            <Button variant="primary" onClick={markRequestDone}>Mark Request as Done</Button>
          </MDBCol>
          <MDBCol size='3'></MDBCol>
        </MDBRow>
      </>
    );

  };

  return (
    (roleId === '1' || roleId === '6') && isLoggedIn ?
      (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='Page'>
            <MDBRow style={{ marginTop: '50px' }}>
              <h1>Welcome Back, {fullUserName}!</h1>
            </MDBRow>

            <MDBRow>

              <MDBCol size='12'>

                <MDBTabs fill className='mt-3'>
                  <MDBTabsItem>
                    <MDBTabsLink className='cm-text' onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                      Unassigned Requests
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink className='cm-text' onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                      Site Surveyor In-Progress Requests
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink className='cm-text' onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
                      Site Surveyor Completed Requests
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink className='cm-text' onClick={() => handleVerticalClick('tab4')} active={verticalActive === 'tab4'}>
                      Customer Scheduled Requests
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

                  { /* Site Surveyor Completed Requests */}
                  <MDBTabsPane show={verticalActive === 'tab3'}>
                    <DataTable
                      title=" "
                      columns={completedRequestColumns}
                      data={completedRequests}
                      fixedHeader
                      expandableRows
                      expandableRowExpanded={(row) => (row === currentRow)}
                      onRowClicked={(row) => setCurrentRow(row)}
                      expandableRowsComponent={SiteSurveyorCompletedComponent}
                      onRowExpandToggled={(bool, row) => setCurrentRow(row)}
                    />
                  </MDBTabsPane>

                  {/* Customer Scheduled Requests */}
                  <MDBTabsPane show={verticalActive === 'tab4'}>
                    <DataTable
                      title=" "
                      columns={scheduledRequestsColumns}
                      data={scheduledRequests}
                      fixedHeader
                      expandableRows
                      expandableRowExpanded={(row) => (row === table4Row)}
                      onRowClicked={(row) => setTable4Row(row)}
                      expandableRowsComponent={CustomerScheduledComponent}
                      onRowExpandToggled={(bool, row) => setTable4Row(row)}
                    />
                  </MDBTabsPane>

                </MDBTabsContent>
              </MDBCol>
              <MDBCol size='1'></MDBCol>
            </MDBRow>
          </div>
        </motion.div>) : (<div>Invalid</div>)
  );
}