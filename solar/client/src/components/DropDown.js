import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getAuthToken } from '../utils/utils';


function Dropdown({ selectedRows }) {
  const [values, setValues] = useState();
  const [selectedValue, setSelectedValue] = useState('');

  const token = "Token " + getAuthToken()

  // fetch the list of values from the API
  useEffect(() => {
      axios.get('/api/construction-managers/', {
        headers: {
          "Authorization": token
        }
      })
        .then(response => {
          console.log(response)
          setValues(response.data);
        })
        .catch(error => {
          console.log(error);
        });
  }, []);

  // handle the selection of a value from the dropdown
  const handleSelect = (event) => {
    setSelectedValue(event.target.value);
  };

  // useEffect(() => {
  //   console.log(selectedValue);
  // }, [selectedValue]);
  
  // handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const request_ids = selectedRows.map((row) => row.request_id);

    if (selectedValue.length > 0 && request_ids !== null && request_ids.length > 0) {
      const json = JSON.stringify({
        request_ids: request_ids,
        const_mgr: selectedValue
      });
      
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.post('https://c80q5wc5m0.execute-api.us-east-1.amazonaws.com/UAT', json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response)
        if (response && response.status === 200) {
          toast.success(`Successfully assigned ${request_ids} to Construction manager: ${selectedValue}`)
        } else if (response && response.status in [400, 404]) {
          toast.error('There was an issue with your Request. Please contact IT for support.')
        } else {
          toast.error('There was an issue with the Request API. Please try again later.')
        }
    })
  } else {
    toast.error('Please use the checkboxes to specify which requests and assign the values to a construction manager.')
  }
  };
  
  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <h2>Construction managers</h2>
        <Form.Select value={selectedValue} onChange={handleSelect}>
          <option value={''}>Select</option>
          {
            values &&
            values.map(val => (
              <option key={val.id} value={val.id}> {val.first_name + " " + val.last_name} </option>
            ))
          }
        </Form.Select>
        <Button type="submit" variant='success'>Submit</Button>
      </Form>
    </div>
  );
}

export default Dropdown;