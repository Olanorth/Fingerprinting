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

            // Send the location data to the server
            await axios.post('https://browserfapp.azurewebsites.net/api/storeLocationDetails', updatedLocationData);
          } catch (error) {
            console.error('Error fetching location details:', error.message);
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.error("User denied the request for geolocation.");
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
      <p>Latitude: {locationData.latitude}</p>
      <p>Longitude: {locationData.longitude}</p>
      <p>City: {locationData.city}</p>
      <p>Country: {locationData.country}</p>
      <p>Postcode: {locationData.postcode}</p>
    </div>
  );
};

export default LocationComponent;
