import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const DeviceIdComponent = () => {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    // Check if device id is stored in local storage
    let storedDeviceId = localStorage.getItem('deviceId');

    // If not, generate a new one
    if (!storedDeviceId) {
      storedDeviceId = uuidv4();
      localStorage.setItem('deviceId', storedDeviceId);

   
    }

    setDeviceId(storedDeviceId);
    (async () => {
      try {
        const response = await axios.post('https://browserfapp.azurewebsites.net/dId', { deviceId: storedDeviceId });
        console.log('Server response:', response.data);
      } catch (error) {
        console.error(error.message);
      }
    })(); 

  }, []);

  return (
    <div>
      <h2>User Device ID:</h2>
      <ul>
      <p>{deviceId}</p>
      </ul>
    </div>
  );
};

export default DeviceIdComponent;
