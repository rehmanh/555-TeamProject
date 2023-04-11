import React, { useState, useEffect, useCallback } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import axios from 'axios';
import CustomListDropDown from './DropDown';
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
    axios.get('https://m90c2ol29g.execute-api.us-east-1.amazonaws.com/UAT')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectedRow = useCallback(state => {
    setSelectedRows(state.selectedRows)
  }, []);

  // useEffect(() => {
  //   console.log(selectedRows);
  // }, [selectedRows])

  const columns = [
    {name: 'Name', selector: 'first_name', center: true},
    {name: 'Request ID', selector: 'request_id', center: true },
    {name: 'Sales Rep Assigned', selector: 'sales_rep_id', center: true},
    {name: 'Date of request', selector: 'created_at_datetime', center: true},
    {name: 'Request Status', selector: 'request_status', center: true},
  ];

  return (
    <div>
      <CustomListDropDown selectedRows={selectedRows}/>
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