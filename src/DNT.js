import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoNotTrackStatus() {
  const [doNotTrackEnabled, setDoNotTrackEnabled] = useState('Loading...');

  useEffect(() => {
    
    // Function to check if 'Do Not Track' is enabled
    function checkDoNotTrack() {
      if (navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes') {
        return true;
      } else {
        return false;
      }
    }

    // Update state with 'Do Not Track' status when the component mounts
    const isDoNotTrackEnabled = checkDoNotTrack();
    setDoNotTrackEnabled(isDoNotTrackEnabled ? 'Enabled' : 'Not Enabled');

        // console.log('DNT:', isDoNotTrackEnabled)
        // Post 'Do Not Track' status to the server for storage
        axios.post('http://localhost:8080/api/storeDNTDetails', {
          doNotTrackStatus: isDoNotTrackEnabled 
        // DNT: doNotTrackEnabled,
        })
          .then(response => {
            // console.log('Do Not Track status stored successfully.');
          })
          .catch(error => {
            console.error('Error storing Do Not Track status:', error.message);
          });

  }, []);

  return (
    <div>
      <h2>'Do Not Track' Status:</h2>
      <p>{doNotTrackEnabled}</p>
    </div>
  );
}

export default DoNotTrackStatus;
