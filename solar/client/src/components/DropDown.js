import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';


function Dropdown(props) {
  const [values, setValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  // fetch the list of values from the API
  useEffect(() => {
    axios.get('https://bkpqz1ao2e.execute-api.us-east-1.amazonaws.com/UAT')
      .then(response => {
        setValues(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // handle the selection of a value from the dropdown
  const handleSelect = (event) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
  };

  // useEffect(() => {
  //   console.log(selectedValue);
  // }, [selectedValue]);
  
  // handle the form submission
  const handleSubmit = (event) => {
    const json = JSON.stringify({
      request_id: props.selectedRows,
      const_mgr: selectedValue
    });
    event.preventDefault();
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.post('https://e8cpgg0x5f.execute-api.us-east-1.amazonaws.com/UAT', json, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response)
      if (response && response.status === 200) {
        toast.success(`Successfully assigned Requests to Construction manager: ${selectedValue}`)
      } else if (response && response.status in [400, 404]) {
        toast.error('There was an issue with your Request. Please contact IT for support.')
      } else {
        toast.error('There was an issue with the Request API. Please try again later.')
      }
    })
  };
  
  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <h2>Construction managers</h2>
        <Form.Select value={selectedValue} onChange={handleSelect}>
          <option value={null}>Select</option>
          {values.map(value => (
            <option key={value.id} value={value.const_mgr}>{value.const_mgr}</option>
          ))}
        </Form.Select>
        <Button type="submit" variant='success'>Submit</Button>
      </Form>
    </div>
  );
}

export default Dropdown;