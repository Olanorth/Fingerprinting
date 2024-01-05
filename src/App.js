
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
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
import DeviceIdComponent from './devID';


function DataUsagePage() {

  return (
<div style={appContainer}>
      <h2 style={heading}>Privacy Policy: How We Use Your Data for our Browser Fingerprinting Research</h2>

      <div style={sectionContainer}>
        <h3 style={headerStyles}> Purpose of the Research:</h3>
        <p>
          At Privacy Checks, we are committed to safeguarding your privacy and ensuring transparency in how we handle your data. This Privacy Policy outlines the purpose, scope, and safeguards associated with the collection and use of your data during our browser fingerprinting research.
        </p>
      </div>

      <div style={sectionContainer}>
        <h3 style={headerStyles}> Data We Collect:</h3>
        <p>
          During your interaction with our web app, we collect the following data for research purposes:
        </p>
        <ul>
          <li style={listItemStyles}>Browser Details: Information about your browser type, version, plugins, and configurations.</li>
          <li style={listItemStyles}>Device Details: Details about your device, including operating system, screen resolution, and hardware details.</li>
          <li style={listItemStyles}>IP Address: Your IP address, a numerical label assigned to your device on the internet.</li>
          <li style={listItemStyles}>Location Data: Geographical information about your approximate location based on your IP address or any location data you choose to provide.</li>
          <li style={listItemStyles}>Privacy Settings: Data related to your browser and privacy settings that may influence your online experience.</li>
        </ul>
      </div>

      <div style={sectionContainer}>
        <h3 style={headerStyles}> Data Storage and Security:</h3>
        <p>
          All collected data is stored securely and is accessible only to authorized personnel involved in the research project. We employ industry-standard security measures to prevent unauthorized access, disclosure, alteration, or destruction of the data.
        </p>
      </div>
      <div style={sectionContainer}>
        <p>
          By using our web app, you explicitly consent to the collection and processing of the aforementioned data for the stated research purposes. If you have concerns or questions regarding our data handling practices, please contact us at dipznano@gmail.com.
        </p>
        <p>
          We value your privacy and are dedicated to conducting this research in an ethical and responsible manner. Thank you for your trust and participation in our efforts to advance knowledge and awareness in the field of browser fingerprinting.
        </p>
        <p>
          PrivacyChecks.com
          <br />
          26/12/2023
        </p>
      </div>
    </div>
  );
}


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


  const handleLinkClick = async () => {
    // Make a request to the server when the link is clicked
    try {
      await axios.post('https://browserfapp.azurewebsites.net/api/trackLinkClick', { checked: true });
    } catch (error) {
      console.error('Error sending tracking data:', error.message);
    }
  };

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
          <nav>
            <Link to="/data-usage" onClick={handleLinkClick}>How we use your data</Link>
          </nav>
        </div>
        <div>
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
                  <div style={sectionContainer}>
                    <h2 style={sectionHeading}>Canvas Rendering</h2>
                    <Canvas />
                  </div> 
                  <LocationComponent />
                  <DeviceIdComponent />
                  <div style={sectionContainer}>
                      <h2 style={sectionHeading}>Your IP Address:</h2>
                      <ul>
                      <p>{ipAddress || 'Loading...'}</p>
                      </ul>
                  </div>
                </div>
              </div>
    );
  }
  
  
  const appContainer = {
    fontFamily: 'Poppins, Arial, sans-serif',
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
  
  // Additional styling for list items
  const listItemStyles = {
    marginBottom: '8px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '8px',
  };
  
  
  
  export default App;
  