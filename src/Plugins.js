import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Plugins() {
  const [pluginDetails, setPluginDetails] = useState({
    installedPlugins: [],
    isFlashEnabled: false,
  });

  useEffect(() => {
    const fetchPluginDetails = async () => {
      try {

        // await new Promise(resolve => setTimeout(resolve, 3000));

        const plugins = navigator.plugins;

        // Check if Flash is enabled
        let isFlashEnabled = false;
        for (let i = 0; i < plugins.length; i++) {
          if (plugins[i].name.toLowerCase().includes('flash')) {
            isFlashEnabled = true;
            break;
          }
        }

        // Get installed plugin names
        const installedPlugins = Array.from(plugins).map((plugin) => plugin.name);

        // Update state with plugin details
        setPluginDetails({ installedPlugins, isFlashEnabled });

        // console.log("Installed Plugins: ", { installedPlugins, isFlashEnabled });
        // Post plugin details to the server for storage
        await axios.post('https://browserfapp.azurewebsites.net/plug', {
            pluginDetails: { installedPlugins, isFlashEnabled }, // Send the updated state
        });

        // console.log('Plugin details stored successfully.');
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPluginDetails();
  }, []); 

  return (
    <div>
      <h2>Plugin Details:</h2>
      <ul>
        <li style={listItemStyles}>Flash Enabled: {pluginDetails.isFlashEnabled ? 'Yes' : 'No'}</li>
        <li>
          Installed Plugins:
          <ul >
            {pluginDetails.installedPlugins.length > 0 ? (
              pluginDetails.installedPlugins.map((plugin, index) => (
                <li style={listItemStyles}key={index}>{plugin}</li>
              ))
            ) : (
              <li>No installed plugins</li>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
}

const listItemStyles = {
  marginBottom: '8px',
  borderBottom: '1px solid #ddd',
  paddingBottom: '8px',
};

export default Plugins;
