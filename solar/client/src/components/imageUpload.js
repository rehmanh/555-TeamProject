import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const ImgUp = ({request, siteSurveyor}) => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [comments, setComments] = useState("");

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage1(reader.result.split(",")[1]);
      //console.log(reader.result.split(",")[1]);
    };
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage2(reader.result.split(",")[1]);
      //console.log(`Image 2 selected: ${file.name}`);
    };
  };

  const handleCommentChange = (e) => {
    const comment = e.target.value
    setComments(comment)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      request_id: request, 
      site_syr: siteSurveyor,
      site_survey_pic_1: image1,
      site_survey_pic_2: image2,
      site_svr_comm: comments
    };
    fetch("https://2vodj8q2z4.execute-api.us-east-1.amazonaws.com/UAT", {
      method: "POST",
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <>
        <Form.Group controlId="image1" className="mb-3">
          <Form.Label>Image 1</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImage1Change}
          />
        </Form.Group>
        <Form.Group controlId="image2" className="mb-3">
          <Form.Label>Image 2</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImage2Change}
          />
        </Form.Group>
        <Form.Group controlId="comments" className="mb-3">
          <Form.Label>Comments</Form.Label>
          <Form.Control type="text" placeholder="Please enter some comments" onChange={handleCommentChange} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
    </>
  );
};
