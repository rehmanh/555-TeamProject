import React, { useState, useEffect, useCallback } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import axios from 'axios';
// import Dropdown from './DropDown';
import CustomListDropDown from './DropDown';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';

createTheme('solarized', {
  text: {
    primary: 'black',
    secondary: '#2aa198',
  },
  background: {
    default: 'white',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

const customStyles = {
  rows: {
      style: {
          minHeight: '72px'
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px',
          paddingRight: '8px',
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', 
          paddingRight: '8px'
      },
  },
};

function Table() {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios.get('https://8off7ckjwd.execute-api.us-east-1.amazonaws.com/UAT')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectedRow = useCallback(state => {
    setSelectedRows(state.selectedRows)
    console.log(state.selectedRows)
  }, []);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows])

  const columns = [
    {name: 'Name', selector: 'first_name', center: true},
    {name: 'Request ID', selector: 'request_id', center: true },
    {name: 'Sales Rep Assigned', selector: 'sales_rep_id', center: true},
    {name: 'Date of request', selector: 'created_at_datetime', center: true},
    {name: 'Request Status', selector: 'request_status', center: true},
  ];

  return (
    <div>
      <CustomListDropDown selectedRows={selectedRows.request_id}/>
      <DataTable
        title="All customers"
        columns={columns}
        data={data}
        selectableRows
        fixedHeader
        onSelectedRowsChange={handleSelectedRow}
        theme='solarized'
        customStyles={customStyles}
        />
    </div>
  );
}

export default Table;
// import axios from 'axios';

// function Table() {
//   const [data, setData] = useState([]);
//   const [filter, setFilter] = useState({});

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://8off7ckjwd.execute-api.us-east-1.amazonaws.com/UAT');
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setFilter({ ...filter, [name]: value });
//   };

//   const filteredData = data.filter((item) => {
//     return (
//       (!filter.first_name || (item.first_name.includes(filter.first_name)) &&
//       (!filter.sales_rep_id || (item.sales_rep_id.includes(filter.sales_rep_id)) &&
//       (!filter.request_id || (item.request_id.includes(filter.request_id))
//       ))))
//     });

//   return (
//     <div>
//       <h1>Table</h1>
//       <div>
//         <label htmlFor="id">ID:</label>
//         <input type="text" name="id" onChange={handleFilterChange} />
//       </div>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input type="text" name="name" onChange={handleFilterChange} />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input type="text" name="email" onChange={handleFilterChange} />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item) => (
//             <tr key={item.id}>
//               <td>{item.first_name}</td>
//               <td>{item.sales_rep_id}</td>
//               <td>{item.request_id}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Table;


// const handleSelectedRow = async (state) => {
  //   try {
  //     setSelectedRows(state.selectedRows);
  //     console.log(state);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };