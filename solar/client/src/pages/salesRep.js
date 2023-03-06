// import React, { Component } from 'react';
// // import { render } from "react-dom"

// export default class HomePage extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <h1>Sales Rep</h1>
//     }
// }
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../pages/navbar'
import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

export default function App() {
  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value= String) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  return (
    <div>
        <Navbar />
    <>
      <MDBRow>
        <MDBCol size='2'>
          <MDBTabs pills className='flex-column text-center'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
              Unassigned clients
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
              Clients
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
              On going Projects
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='8'>
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === 'tab1'}>Unassigned clients</MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}>Clients</MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab3'}>On going Projects</MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </>
    </div>
  );
}