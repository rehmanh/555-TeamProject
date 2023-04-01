// import 'bootstrap/dist/css/bootstrap.css';
// import SolarNavbar from '../pages/navbar'
// import React, { Component, useEffect, useState } from "react";
// import {
//   MDBTabs,
//   MDBTabsItem,
//   MDBTabsLink,
//   MDBTabsContent,
//   MDBTabsPane,
//   MDBRow,
//   MDBCol,
//   MDBCheckbox,
//   MDBBtn
// } from 'mdb-react-ui-kit';
// import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
// import { toast } from 'react-toastify'
// import axios from 'axios';

// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';

// function FormFloatingSelect() {
//   return (
//     <FloatingLabel controlId="floatingSelect" label="Works with selects">
//       <Form.Select aria-label="Floating label select example">
//         <option>Open this select menu</option>
//         <option value="1">One</option>
//         <option value="2">Two</option>
//         <option value="3">Three</option>
//       </Form.Select>
//     </FloatingLabel>
//   );
// }

// export default FormFloatingSelect;

import React from 'react'
import { Button } from 'react-bootstrap'
export const CustomDropdown = (props) => (
    <div className="form-group">
      <strong>{props.username}</strong>
      <select
        className="form-control"
        name="{props.username}"
        onChange={props.onChange}
      >
        <option defaultValue>Select {props.name}</option>
        {props.options.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
  export default class CustomListDropDown extends React.Component {
    constructor() {
      super()
      this.state = {
        collection: [],
        value: '',
      }
    }
    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((res) => this.setState({ collection: res }))
    }
    onChange = (event) => {
      this.setState({ value: event.target.value })
    }
    render() {
      return (
        <div className="container mt-4">
          <h2>React Dropdown List API</h2>
          <CustomDropdown
            name={this.state.username}
            options={this.state.collection}
            onChange={this.onChange}/>
            <Button onClick={click}>Button</Button>
        </div>
        
      )
    }
  }

  function click(){
    console.log(item.name)
  }