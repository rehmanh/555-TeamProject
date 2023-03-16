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
  MDBCol
} from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import { ThemeConsumer } from 'styled-components';

// export default function App() {
//   const [verticalActive, setVerticalActive] = useState('tab1');

//   const handleVerticalClick = (value= String) => {
//     if (value === verticalActive) {
//       return;
//     }

//     setVerticalActive(value);
//   };

//   return (
//     <div>
//         <Navbar />
//     <>
//       <MDBRow>
//         <MDBCol size='2'>
//           <MDBTabs pills className='flex-column text-center'>
//             <MDBTabsItem>
//               <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
//                 Clients
//               </MDBTabsLink>
//             </MDBTabsItem>
//             <MDBTabsItem>
//               <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
//               Clients
//               </MDBTabsLink>
//             </MDBTabsItem>
//             <MDBTabsItem>
//               <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
//               On going Projects
//               </MDBTabsLink>
//             </MDBTabsItem>
//           </MDBTabs>
//         </MDBCol>
//         <MDBCol size='8'>
//           <MDBTabsContent>
//             <MDBTabsPane show={verticalActive === 'tab1'}>
//             <MDBTable>
//               <MDBTableHead>
//                 <tr>
//                   <th scope='col'>First name</th>
//                   <th scope='col'>ID</th>
//                   <th scope='col'>City</th>
//                 </tr>
//               </MDBTableHead>
//               <MDBTableBody>
//               <tr ket>
//                   <td>Mark</td>
//                   <td>Otto</td>
//                   <td>@mdo</td>
//                 </tr> 
//               </MDBTableBody>
//             </MDBTable>
//             </MDBTabsPane>
//             <MDBTabsPane show={verticalActive === 'tab2'}>Clients</MDBTabsPane>
//             <MDBTabsPane show={verticalActive === 'tab3'}>On going Projects</MDBTabsPane>
//           </MDBTabsContent>
//         </MDBCol>
//       </MDBRow>
//     </>
//     </div>
//   );
// }


export default class SalesRep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            objectData: ""
        };
        this.retrieveSalesRepData = this.retrieveSalesRepData.bind(this);
    }

    retrieveSalesRepData() {
        fetch("https://h0pt17fv6g.execute-api.us-east-1.amazonaws.com/UAT")
        .then((data) => {
        // console.log(data); DATA IN JSON Format
        console.log(data);
        this.state.objectData = data;
        return data.json(); // Converted data to object
        }).then((objectData) => {
            console.log("in the second then");
            console.log(objectData);
            this.state.objectData = objectData;
        }); 
    }


    render() {
        if (this.state.objectData && this.state.objectData.body !== null) {
            return(
                <div className='container'>
                    <h2 className="text-center">Customer List</h2>
                    <br></br>
                    <div className = "row">
                        <MDBTable className = "table table-striped table-bordered">
                            <MDBTableHead>
                                <tr>
                                    <th>Customer's Request ID</th>
                                    <th>Customer's First Name</th>
                                    <th>Customer's city</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                this.state.objectData.body.map((value) => 
                                <tr key = {value.sales_reps}>
                                    <td>{value.request_id}</td>   
                                    <td>{value.first_name}</td>
                                    <td>{value.city}</td>
                                    </tr>
                                        )
                                }
                            </MDBTableBody>
                        </MDBTable>
                        </div>         
                    </div>
            )
        } else {
            console.log('calling api now')
            this.retrieveSalesRepData()
            return null
        }
        
    }

}


// export default function myApp(){
    
// }

    // this.state = {
    //   customers: []
    // }
    // this.editCustomer = this.editCustomer.bind(this);
    // this.deleteCustomer = this.deleteCustomer.bind(this);
//   }
//   deleteCustomer(request_id){
//     CustomerInfo.deleteCustomer(request_id).then(res => {
//       this.setState({customers: this.state.customers.filter(customers => customers.id !== id)});
//     });
//   }
//   editCustomer(request_id){
//     this.props.history.push(`/add-customer/${request_id}`);
//   }

//   componentDidMount(){
//     CustomerInfo.getCustomer().then((res) => {
//       this.setState({customers: res.data});
//     });
//   }

//   addCustomer(){
//     this.props.history.push('/add-customer/_add');
//   }




// import 'bootstrap/dist/css/bootstrap.css';
// import Navbar from '../pages/navbar'
// import React, { useState, useEffect, useReducer } from 'react';
// import {
//   MDBTabs,
//   MDBTabsItem,
//   MDBTabsLink,
//   MDBTabsContent,
//   MDBTabsPane,
//   MDBRow,
//   MDBCol
// } from 'mdb-react-ui-kit';
// import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';


// fetch("https://h0pt17fv6g.execute-api.us-east-1.amazonaws.com/UAT").then((data) => {
//     // console.log(data); DATA IN JSON Format
//     return data.json(); // Converted data to object
// }).then((objectData) => {
//     console.log(objectData);
//     let tableData="";
//     objectData.map((values) => {
//         tableData += `<tr>
//         <td>${values.request_id}</td>
//         <td>${values.first_name}</td>
//         <td>@${values.city}</td>
//         </tr>`;
//     });
// })

// export default function myApp() {
//     return(
//         <div className='container'>
//         <table class="table table-bordered">
//             <thead className='table-dark'>
//                 <tr>
//                 <th scope="col">Request ID</th>
//                 <th scope="col">First ame</th>
//                 <th scope="col">City</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     this.state.objectData.map(())
//                 }
//             </tbody>
//         </table>
//         </div>
//     )
// }

