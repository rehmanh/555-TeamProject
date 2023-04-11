import 'bootstrap/dist/css/bootstrap.css';
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import LineChart from '../components/LineChart'
import OrderTable from '../components/OrderTable';
import { motion } from 'framer-motion';
//import Calender from '../components/Calender';
import CustomerTable from '../components/CustProgTable'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
import '../css/opManager.css'
import { toast } from 'react-toastify'
import '../css//UserRequestForm.css'
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
import Scheduler from '../components/Scheduler';

export default function OpManager() {

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      {/* <Navbar /> */}
      <h1>
        Welcome back Operation Manager!
      </h1>
      <div className='opPage'>

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
          <MDBRow className="mt-4 text-center">
            <MDBCol sm='3'></MDBCol>
            <MDBCol sm='6'>
              <MDBCard>
                <Scheduler />
                {/* <Calender /> */}
                {/* <MDBCardBody>
                <MDBCardTitle>New Requests</MDBCardTitle>
                <MDBCardText>
                  1
                </MDBCardText>
              </MDBCardBody> */}
              </MDBCard>
            </MDBCol>
            <MDBCol sm='3'></MDBCol>
            <MDBRow>&nbsp;</MDBRow>
            <MDBCol sm='12'>
              <MDBRow >
                <MDBCol>
                  <MDBCard>
                    <CustomerTable />
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBCard>
                    
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          {/* <MDBRow className="mt-4">
            <MDBCol sm={11}>
              <MDBCard>
                <OrderTable />
              </MDBCard>
            </MDBCol>
          </MDBRow> */}
        </MDBContainer>
      </div>
    </motion.div >
  )
}
