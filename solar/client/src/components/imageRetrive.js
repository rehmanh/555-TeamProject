import React, { useState, useEffect } from "react";

function ImageRetrieve({ request }) {
  const [imageUrls, setImageUrls] = useState([]);

  const uncompressImage = async (imageData) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `data:image/png;base64,${imageData}`;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        resolve(canvas.toDataURL());
      };
    });
  };

  useEffect(() => {
    const requestData = { request_id: request };
    fetch("https://z23a6r2xk2.execute-api.us-east-1.amazonaws.com/UAT", {
      method: "POST",
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then(async (data) => {
        const imageUrls = [];
        if (data.site_survey_pic_1) {
          const uncompressedImage1 = await uncompressImage(data.site_survey_pic_1);
          imageUrls.push(uncompressedImage1);
        }
        if (data.site_survey_pic_2) {
          const uncompressedImage2 = await uncompressImage(data.site_survey_pic_2);
          imageUrls.push(uncompressedImage2);
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
              src={imageUrl}
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
