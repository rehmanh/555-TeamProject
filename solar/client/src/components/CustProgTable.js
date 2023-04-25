import React, { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import CustomListDropDown from './DropDown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { getAuthToken } from '../utils/utils';


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
  const [salesReps, setSalesReps] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  const token = "Token " + getAuthToken()


  useEffect(() => {
    Promise.all([
      fetch("https://m90c2ol29g.execute-api.us-east-1.amazonaws.com/UAT", {
        method: "GET"
      }),
      fetch("/api/salesreps/", {
        method: "GET",
        "Authorization": token
      })
    ])
    .then(([allDataResponse, salesRepResponse]) => 
      Promise.all([allDataResponse.json(), salesRepResponse.json()])
    )
    .then(([dataAll, dataSalesReps]) => {
      setData(dataAll)
      flushSync(() => { setSalesReps(dataSalesReps) })
    })
  }, []);

  const handleSelectedRow = useCallback(state => {
    setSelectedRows(state.selectedRows)
  }, []);

  const filterSalesRepName = (rowData) => {
    if (rowData == undefined || salesReps == undefined) {
      return 'N/A'
    } else {
      return salesReps.filter((s) => s.id == rowData.sales_rep_id)[0].first_name + ' ' + salesReps.filter((s) => s.id == rowData.sales_rep_id)[0].last_name
    }
  };

  const columns = [
    {name: 'Name', selector: (row, i) => row.first_name, center: true},
    {name: 'Request ID', selector: (row, i) => row.request_id, center: true },
    {name: 'Sales Rep Assigned', selector: (row, i) => 
      filterSalesRepName(row),
      center: true
    },
    {name: 'Date of request', selector: (row, i) => row.created_at_datetime, center: true},
    {name: 'Request Status', selector: (row, i) => row.request_status, center: true},
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