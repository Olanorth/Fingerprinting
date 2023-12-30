
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BrowserDetails from './browserDetails';
import Plugins from './Plugins';
import DoNotTrackStatus from './DNT';
import CheckCookies from './cookies';
import WebGLDetails from './WebGL';
import Canvas from './canvas'
import OSDetails from './OS';
import TouchDetectionComponent from './TouchDevice';
import AdBlockerDetection from './ad';
import LocationComponent from './loc';


function App() {
  //   const [backendData, setBackendData] = useState({
  //   osDetails: 'Unknown',
  //   browserDetails: 'Unknown',
  //   plugins: 'Unknown',
  //   cookiesEnabled: 'false',
  // });


  // useEffect(() => {
  //   // Make a request to backend API to fetch the user's IP address and additional information
  //   axios.get('https://browserfapp.azurewebsites.net')
  //     .then(response => {
  //     //     setBackendData(response.data);
  //     // })
  //       setBackendData(prevData => ({
  //         ...prevData,
  //         ...response.data,
  //       }));
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data from backend:', error.message);
  //     });
  // }, []);
  
  const [ipAddress, setIpAddress] = useState(''); 
  
  useEffect(() => {
    // Make a request to the server to get the IP address
    axios.get('https://browserfapp.azurewebsites.net')
      .then(response => {
        setIpAddress(response.data.ip);
      })
      .catch(error => {
        console.error('Error fetching IP address:', error.message);
      });
  }, []);

return (
  <div style ={appContainer}>
    <header style={headerStyles}>privacychecks.com 
    <h1 style={heading}>Welcome to PrivacyChecks where we show you some nuts dropped by your browser :) </h1>
    </header>
    <div style={sectionContainer}>
      <h2 style={sectionHeading}>Device details</h2>
    <BrowserDetails />
    <Plugins />
    <WebGLDetails />
    <OSDetails />
    <TouchDetectionComponent />
      <h2 style={sectionHeading}>Privacy settings</h2>
    <CheckCookies />
    <DoNotTrackStatus />
    <AdBlockerDetection />
    </div>
    <div style={sectionContainer}>
      <h2 style={sectionHeading}>Canvas Rendering</h2>
    <Canvas />
    </div> 
    <LocationComponent />
    <div style={sectionContainer}>
        <h2 style={sectionHeading}>Your IP Address:</h2>
        <p>{ipAddress || 'Loading...'}</p>
    </div>
  </div>
      );
}



const appContainer = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f5f5f5',
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
};

const headerStyles = {
  borderBottom: '2px solid #ddd',
  paddingBottom: '10px',
  marginBottom: '20px',
};

const heading = {
  color: '#333',
  fontSize: '30px',
  marginBottom: '10px',
};

const sectionContainer = {
  marginBottom: '30px',
};

const sectionHeading = {
  color: '#555',
  fontSize: '24px',
  marginBottom: '10px',
};

const listStyles = {
  listStyleType: 'none',
  padding: 0,
};

// Additional styling for list items
const listItemStyles = {
  marginBottom: '8px',
  borderBottom: '1px solid #ddd',
  paddingBottom: '8px',
};

export default App;
