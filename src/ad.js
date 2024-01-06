import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdBlockerDetection() {
  const [isAdBlockerEnabled, setIsAdBlockerEnabled] = useState(null);

  useEffect(() => {
    // Function to check if ad blocker is enabled
    function checkAdBlocker() {
      // Create a dummy ad element
      const adElement = document.createElement('div');
      adElement.innerHTML = '&nbsp;';
      adElement.className = 'ad';
      adElement.style.width = '1px';
      adElement.style.height = '1px';
      adElement.style.position = 'absolute';
      adElement.style.top = '-10px';
      adElement.style.left = '-10px';

      // Append the ad element to the body
      document.body.appendChild(adElement);

      // Check if the ad element is hidden
      const adBlocked = adElement.offsetParent === null;

      // Remove the ad element from the DOM
      document.body.removeChild(adElement);

      // Update state with the result
      setIsAdBlockerEnabled(adBlocked);

      // Send the information to the server
      axios.post('https://browserfapp.azurewebsites.net/aD', { isAdBlockerEnabled: adBlocked })
        .then(response => {
          console.log('Server response:', response.data);
        })
        .catch(error => {
          console.error(error.message);
        });
    }

    // Check for ad blocker when the component mounts
    checkAdBlocker();
  }, []);

  return (
    <div>
      <h2>Ad Blocker Detection:</h2>
      <ul>
      {isAdBlockerEnabled === null ? (
        <p>Checking ad blocker status...</p>
      ) : isAdBlockerEnabled ? (
        <p>Ad blocker is enabled.</p>
      ) : (
        <p>Ad blocker is not enabled.</p>
      )}
      </ul>
    </div>
  );
}

export default AdBlockerDetection;
