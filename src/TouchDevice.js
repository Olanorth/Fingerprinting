// import React, { useEffect } from 'react';
// import axios from 'axios';

// function TouchDetectionComponent() {
//     useEffect(() => {
//       async function checkAndSendTouchInfo() {
//         function isTouchDevice() {
//           return 'ontouchstart' in window || navigator.maxTouchPoints;
//         }
  
//         if (isTouchDevice()) {
//           console.log('Touchscreen is supported on this device.');
//         } else {
//           console.log('This device does not support touch.');
//         }
        
//         const touchInfo = {
//           isTouchDevice: isTouchDevice(),
//         };
  
//         console.log('Device: ', touchInfo)
//         // Send the touch information to the server
//         try {
//           const response = await axios.post('http://localhost:4000/api/touchInfo', touchInfo);
//           console.log('Server response:', response.data);
//         } catch (error) {
//           console.error('Error sending touch information to the server:', error.message);
//         }
//       }
  
//       checkAndSendTouchInfo();
//     }, []);

//   }

//   export default TouchDetectionComponent;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TouchDetectionComponent() {
  const [touchInfo, setTouchInfo] = useState(null);

  useEffect(() => {
    async function checkAndSendTouchInfo() {
      function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
      }

      const touchDevice = isTouchDevice();
      setTouchInfo({ isTouchDevice: touchDevice });

      if (touchDevice) {
        // console.log('Touchscreen is supported on this device.');
      } else {
        // console.log('This device does not support touch.');
      }

      // Send the touch information to the server
      try {
        const response = await axios.post('http://localhost:8080/api/touchInfo', { isTouchDevice: touchDevice });
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error sending touch information to the server:', error.message);
      }
    }

    checkAndSendTouchInfo();
  }, []);

  return (
    <div>
      <h2>Touch Information:</h2>
      {touchInfo ? (
        <p>{touchInfo.isTouchDevice ? 'Touchscreen is supported.' : 'This device does not support touch.'}</p>
      ) : (
        <p>Loading touch information...</p>
      )}
    </div>
  );
}

export default TouchDetectionComponent;
