import React, { useEffect, useCallback } from 'react';
import axios from 'axios';


function BrowserDetails(){

        const sendBrowserDetails = useCallback(async () => {
          try {
    const browserDetails = {
        userAgent: navigator.userAgent,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        platform: navigator.platform,
        userLanguages: navigator.languages,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        availScreenWidth: window.screen.availWidth,
        availscreenHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
        currency: navigator.hardwareConcurrency,
      };

        // Post browser details to the server for storage
        await axios.post('https://browserfapp.azurewebsites.net/brow', {
          browserDetails,
        });

        // console.log('Browser details stored successfully.');
      } catch (error) {
        console.error(error.message);
      }
    // };

    // // Call the function when the component mounts
    // sendBrowserDetails();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  useEffect(() => {
    // Call the memoized function when the component mounts
    sendBrowserDetails();
  }, [sendBrowserDetails]); 


    return (
        <div>
          <h2>Browser Details:</h2>
          <ul>
            <li style={listItemStyles}>User Agent: {navigator.userAgent}</li>
            <li style={listItemStyles}>App Name: {navigator.appName}</li>
            <li style={listItemStyles}>App Version: {navigator.appVersion}</li>
            <li style={listItemStyles}>Platform: {navigator.platform}</li>
            <li style={listItemStyles}>Languages: {[navigator.languages]}</li>
            <li style={listItemStyles}>Available Screen Width: {window.screen.availWidth} pixels</li>
            <li style={listItemStyles}>Available Screen Height: {window.screen.availHeight} pixels</li>
            <li style={listItemStyles}>Total Screen Width: {window.screen.width} pixels</li>
            <li style={listItemStyles}>Total Screen Height: {window.screen.height} pixels</li>
            <li style={listItemStyles}>Color Depth: {window.screen.colorDepth} pixels</li>
            <li style={listItemStyles}>Concurrency: {navigator.hardwareConcurrency} </li>
          </ul>
        </div>
      );
}

const listItemStyles = {
  marginBottom: '8px',
  borderBottom: '1px solid #ddd',
  paddingBottom: '8px',
};
export default BrowserDetails;