import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../pages/navbar'
// import React, { useState, useEffect, useReducer } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import React, { Component, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { ThemeConsumer } from 'styled-components';

export default function App() {
  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value= String) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  const [data, setData] = useState();

    useEffect(() => {
        fetch("https://h0pt17fv6g.execute-api.us-east-1.amazonaws.com/UAT").then((data) => {
            // console.log(data); DATA IN JSON Format
            return data.json(); // Converted data to object
        }).then((objectData) => {
            console.log("in the second then");
            console.log(objectData);
            //this.state.objectData = objectData;
            setData(objectData.body.sales_reps);
        }, [])    
    });

  return (
    <div>
        <Navbar />
    <>
      <MDBRow>
        <MDBCol size='2'>
          <MDBTabs pills className='flex-column text-center'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                Requests
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
              Approved Requests
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
              On going Projects
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === 'tab1'}>
              <h1>
                <MDBBtn>Refresh</MDBBtn>
              </h1>
                <MDBTable className = "table table-light table-bordered table-responsive table-hover">
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'>
                                    <MDBBtn rounded color='success' type='submit'>Submit</MDBBtn>
                                </th>
                                <th>Customer's Request ID</th>
                                <th>Customer's First Name</th>
                                <th>Customer's city</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                data && <SalesRepTable data={data}/>
                            }
                        </MDBTableBody>
                    </MDBTable>
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}>Clients</MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab3'}>On going Projects</MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </>
    </div>
  );
}

function SalesRepTable({data}) {
    return (
        <>
        {
            data.map((value) => (
                <tr key = {value.sales_reps}>
                    <th scope='col'>
                        <MDBCheckbox></MDBCheckbox>
                    </th>
                    <td>{value.request_id}</td>   
                    <td>{value.first_name}</td>
                    <td>{value.city}</td>
                </tr>
            ))
        }
        </>
    );
}

// export default function SalesRep() {
    

//     return(
//         <div className='container'>
//             <h2 className="text-center">Customer List</h2>
//             <br></br>
//             <div className = "row">
//                 <MDBTable className = "table table-striped table-bordered">
//                     <MDBTableHead>
//                         <tr>
//                             <th>Customer's Request ID</th>
//                             <th>Customer's First Name</th>
//                             <th>Customer's city</th>
//                         </tr>
//                     </MDBTableHead>
//                     <MDBTableBody>
//                         {
//                             data && <SalesRepTable data={data}/>
//                         }
//                     </MDBTableBody>
//                 </MDBTable>
//                 </div>         
//             </div>
//     )
// }

// function SalesRepTable({data}) {
//     return (
//         <>
//         {
//             data.map((value) => (
//                 <tr key = {value.sales_reps}>
//                     <td>{value.request_id}</td>   
//                     <td>{value.first_name}</td>
//                     <td>{value.city}</td>
//                 </tr>
//             ))
//         }
//         </>
//     );
// }


