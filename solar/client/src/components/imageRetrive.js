import React, { useState, useEffect } from "react";

function ImageRetrieve({request}) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const requestData = { request_id: request}; //use props.request_id, assuming you are recieving the id from props
    fetch("https://z23a6r2xk2.execute-api.us-east-1.amazonaws.com/UAT", {
      method: "POST",
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrls = [];
        if (data.site_survey_pic_1) {
          imageUrls.push(data.site_survey_pic_1);
        }
        if (data.site_survey_pic_2) {
          imageUrls.push(data.site_survey_pic_2);
        }
        setImageUrls(imageUrls);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {imageUrls.length > 0 ? (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={`data:image/png;base64,${imageUrl}`}
              alt={`API Image ${index}`}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          ))}
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
}

export default ImageRetrieve;
