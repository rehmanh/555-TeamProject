import React, { useState, useEffect } from 'react';

function TrackingInfo({ trackingId }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = "https://7wdf6k3w65.execute-api.us-east-1.amazonaws.com/UAT";
      const requestData = { request_id: trackingId };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(requestData),
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [trackingId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.request_status}</h1>
    </div>
  );
}

export default TrackingInfo;
