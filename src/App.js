
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
// import FP from './getFp';


function App() {
    const [backendData, setBackendData] = useState({
    osDetails: 'Unknown',
    browserDetails: 'Unknown',
    plugins: 'Unknown',
    cookiesEnabled: 'false',
  });

  // const userLanguages = navigator.languages;

  // if (userLanguages.length > 0) {
  //   console.log('User languages:', userLanguages);
  // } else {
  //   console.log('No user languages detected.');
  // }

  useEffect(() => {
    // Make a request to backend API to fetch the user's IP address and additional information
    axios.get('https://browserfapp.azurewebsites.net/api')
      .then(response => {
      //     setBackendData(response.data);
      // })
        setBackendData(prevData => ({
          ...prevData,
          ...response.data,
        }));
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error.message);
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
        {backendData.userIpAddress ? (
        <div style={sectionContainer}>
          <h2 style={sectionHeading}>User's Information:</h2>
          <ul style={listStyles}>
            <li style={listItemStyles}><strong>IP Address:</strong> {backendData.userIpAddress}</li>
            <li style={listItemStyles}><strong>City:</strong> {backendData.city}</li>
            <li style={listItemStyles}><strong>Region:</strong> {backendData.region}</li>
            <li style={listItemStyles}><strong>Country:</strong> {backendData.country}</li>
            <li style={listItemStyles}><strong>Location:</strong> {backendData.location}</li>
            <li style={listItemStyles}><strong>Postal Code:</strong> {backendData.postal}</li>
            <li style={listItemStyles}><strong>Timezone:</strong> {backendData.timezone}</li>
            <li style={listItemStyles}><strong>Organization:</strong> {backendData.organization}</li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
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

// Styling for strong tags within list items
// const strongStyles = {
//   marginRight: '8px',
//   color: '#333',
// };

// const appContainer = {
//   fontFamily: 'Arial, sans-serif',
//   backgroundColor: '#f0f0f0',
//   padding: '20px',
// };

// const heading = {
//   color: 'blue',
//   fontSize: '28px',
//   marginBottom: '20px',
// };

// const sectionContainer = {
//   marginBottom: '20px',
// };

// const listStyles = {
//   listStyleType: 'none',
//   padding: 0,
// };

export default App;
