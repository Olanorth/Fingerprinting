import React, { useEffect, useCallback } from 'react';
import axios from 'axios';


function BrowserDetails(){

        const sendBrowserDetails = useCallback(async () => {
          try {
    const browserDetails = {
        // userAgent: navigator.userAgent,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        platform: navigator.platform,
        userLanguages: navigator.languages,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      };

        // console.log("Browser details", browserDetails)
        // Post browser details to the server for storage
        await axios.post('https://browserfapp.azurewebsites.net/api/storeBrowserDetails', {
          browserDetails,
        });

        // console.log('Browser details stored successfully.');
      } catch (error) {
        console.error('Error storing browser details:', error.message);
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
            {/* <li>User Agent: {navigator.userAgent}</li> */}
            <li>App Name: {navigator.appName}</li>
            <li>App Version: {navigator.appVersion}</li>
            <li>Platform: {navigator.platform}</li>
            <li>Languages: {[navigator.languages]}</li>
            <li>Screen Width: {window.screen.width} pixels</li>
            <li>Screen Height: {window.screen.height} pixels</li>
          </ul>
        </div>
      );
}

export default BrowserDetails;