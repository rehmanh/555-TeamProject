import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const Operation = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files[]", selectedFiles[i]);
    }
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileSelect} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
