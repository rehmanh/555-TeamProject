import 'bootstrap/dist/css/bootstrap.css';
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../pages/navbar'
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import LineChart from '../components/LineChart'
import Table from '../components/Table';
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
              <Table />
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
