import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OSDetails() {
  const [osVersion, setOsVersion] = useState('Unknown');

    const detectOsVersion = async () => {
      try {
        const userAgent = navigator.userAgent;
        let detectedOsVersion = 'Unknown';

        if (/Windows NT 10/.test(userAgent)) {
          detectedOsVersion = 'Windows 10';
        } else if (/Windows NT 6.3/.test(userAgent)) {
          detectedOsVersion = 'Windows 8.1';
        } else if (/Windows NT 6.2/.test(userAgent)) {
          detectedOsVersion = 'Windows 8';
        } else if (/Windows NT 6.1/.test(userAgent)) {
          detectedOsVersion = 'Windows 7';
        } else if (/Windows NT 6.0/.test(userAgent)) {
          detectedOsVersion = 'Windows Vista';
        } else if (/Windows NT 5.1/.test(userAgent)) {
          detectedOsVersion = 'Windows XP';
        } else if (/Windows/.test(userAgent)) {
          detectedOsVersion = 'Windows';
        } else if (/Mac OS X 10_15/.test(userAgent)) {
          detectedOsVersion = 'macOS Catalina';
        } else if (/Mac OS X 10_14/.test(userAgent)) {
          detectedOsVersion = 'macOS Mojave';
        } else if (/Mac OS X 10_13/.test(userAgent)) {
          detectedOsVersion = 'macOS High Sierra';
        } else if (/Mac OS X 10_12/.test(userAgent)) {
          detectedOsVersion = 'macOS Sierra';
        } else if (/Mac OS X/.test(userAgent)) {
          detectedOsVersion = 'macOS';
        } else if (/Linux/.test(userAgent)) {
          detectedOsVersion = 'Linux';
        }

        setOsVersion(detectedOsVersion);

        // console.log("OS:", detectedOsVersion)
        // Post OS details to the server for storage 
         axios.post("https://browserfapp.azurewebsites.net/api/storeOsDetails", {
          osDetails: detectedOsVersion,
        });

        // console.log('OS details stored successfully.');
      } catch (error) {
        console.error('Error detecting or storing OS details:', error.message);
      }
    };

    useEffect(() => {
    detectOsVersion();
  }, []);

  return (
    <div>
      <h2>OS Details:</h2>
      <ul>
        {osVersion ? (
          <li>Operating System Version: {osVersion}</li>
        ) : (
          <li>Operating System Version: Not available</li>
        )}
      </ul>
    </div>
  );
}

export default OSDetails;
