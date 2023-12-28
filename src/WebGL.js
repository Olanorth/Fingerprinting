import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WebGLDetails() {
  const [webGLDetails, setWebGLDetails] = useState({
    webglVendor: 'Loading...',
    webglRenderer: 'Loading...',
    webglVersion: 'Loading...',
  });

  useEffect(() => {
    
    // Function to get WebGL details
    function getWebGLDetails() {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      return {
        webglVendor: gl ? gl.getParameter(gl.VENDOR) : 'Not available',
        webglRenderer: gl ? gl.getParameter(gl.RENDERER) : 'Not available',
        webglVersion: gl ? gl.getParameter(gl.VERSION) : 'Not available',
      };
    }

    // Update state with WebGL details when the component mounts
    const details = getWebGLDetails();
    setWebGLDetails(details);

      // console.log('WebGL details: ', details)
        // Post WebGL details to the server for storage
        axios.post('https://fingerprinting-web-app.lm.r.appspot.com/api/storeWebGLdetails', {
          webGLDetails: details,
        })
        .then(response => {
          // console.log('WebGL details stored successfully:');
        })
        .catch(error => {
          console.error('Error storing WebGL details:', error.message);
        });

  }, []);

  return (
    <div>
      <h2>WebGL Details:</h2>
      <ul>
        <li>WebGL Vendor: {webGLDetails.webglVendor}</li>
        <li>WebGL Renderer: {webGLDetails.webglRenderer}</li>
        <li>WebGL Version: {webGLDetails.webglVersion}</li>
      </ul>
    </div>
  );
}

export default WebGLDetails;


