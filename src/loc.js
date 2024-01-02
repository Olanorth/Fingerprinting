import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationComponent = () => {
  const [locationData, setLocationData] = useState({
    latitude: 'Unknown',
    longitude: 'Unknown',
    city: 'Unknown',
    country: 'Unknown',
    postcode: 'Unknown',
  });
  const [permissionStatus, setPermissionStatus] = useState('Unknown');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            const updatedLocationData = {
              latitude: latitude.toFixed(6),
              longitude: longitude.toFixed(6),
              city: data.address.city || 'Unknown',
              country: data.address.country || 'Unknown',
              postcode: data.address.postcode || 'Unknown',
            };

            // Update state with the location data
            setLocationData(updatedLocationData);

            // Send the location data to the server along with permission status
            axios.post('http://localhost:4000/api/storeLocationDetails', {
              updatedLocationData,
              permissionStatus,
            });

            // console.log('Successfully posted:', updatedLocationData);

            // Update permission status state
            setPermissionStatus('Accepted');
          } catch (error) {
            console.error('Error fetching location details:', error.message);
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.error("User denied the request for geolocation.");
            // Send a message to the server indicating permission denial
            axios.post('https://browserfapp.azurewebsites.net/api/storeLocationDetails', {
              permissionStatus: 'Denied',
            });
            // Update permission status state
            setPermissionStatus('Denied');
          } else {
            console.error(`Error getting location: ${error.message}`);
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h2>Your location:</h2>
      {permissionStatus === 'Accepted' && (
        <>
          <p style={listItemStyles}>Latitude: {locationData.latitude}</p>
          <p style={listItemStyles}>Longitude: {locationData.longitude}</p>
          <p style={listItemStyles}>City: {locationData.city}</p>
          <p style={listItemStyles}>Country: {locationData.country}</p>
          <p style={listItemStyles}>Postcode: {locationData.postcode}</p>
        </>
      )}
      {permissionStatus === 'Denied' && <p>Location permission denied.</p>}
    </div>
  );
};

const listItemStyles = {
  marginBottom: '8px',
  borderBottom: '1px solid #ddd',
  paddingBottom: '8px',
};

export default LocationComponent;
