import React, { useState, useEffect } from 'react';

const BatteryStatusComponent = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(null);

  useEffect(() => {
    // Check if the Battery Status API is supported
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        // Update battery status
        updateBatteryStatus(battery);

        // Listen for changes in battery status
        battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
        battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
      });
    } else {
      console.error('Battery Status API is not supported in this browser.');
    }
  }, []);

  const updateBatteryStatus = (battery) => {
    setBatteryLevel(Math.round(battery.level * 100) + '%');
    setIsCharging(battery.charging);
  };

  return (
    <div>
      <h2>Battery Status:</h2>
      {batteryLevel !== null && (
        <p>
          Level: {batteryLevel} {isCharging !== null && <span>({isCharging ? 'Charging' : 'Not Charging'})</span>}
        </p>
      )}
    </div>
  );
};

export default BatteryStatusComponent;
