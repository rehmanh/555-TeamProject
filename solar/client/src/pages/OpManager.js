import 'bootstrap/dist/css/bootstrap.css';
import React, { Component, useState, useEffect } from "react";
import OrderTable from '../components/OrderTable';
import { motion } from 'framer-motion';
//import Calender from '../components/Calender';
import CustomerTable from '../components/CustProgTable'
import { BsHammer, BsClipboard2CheckFill, BsClipboard2PlusFill } from "react-icons/bs";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import Scheduler from '../components/Scheduler';
import { getUserFullName } from '../utils/utils';
import KpiCards from '../components/kpi';

const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: .8 } },
  hidden: { opacity: 0, scale: 0 },
};

export default function OpManager() {
  const [fullUserName, setFullUserName] = useState('');


  useEffect(() => {
    setFullUserName(getUserFullName)
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <Navbar /> */}
      <div className='opPage'>

        <MDBContainer breakpoint="sm">
          <h1>
            Welcome Back {fullUserName}!
          </h1>
          <KpiCards />

          <MDBRow className="mt-4 text-center">
            <MDBCol sm='3'></MDBCol>
            <MDBCol sm='6'>
              <motion.div
                className="box"
                variants={boxVariant}
                initial="hidden"
                animate="visible"
              >
              </motion.div>
            </MDBCol>
            <MDBCol sm='3'></MDBCol>

            <MDBRow>&nbsp;</MDBRow>
            <MDBCol sm='12'>
              <MDBRow >
                <MDBCol>
                  <motion.div
                    className="box"
                    variants={boxVariant}
                    initial="hidden"
                    animate="visible"
                  >
                    <MDBCard>
                      <CustomerTable />
                    </MDBCard>
                  </motion.div>
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
