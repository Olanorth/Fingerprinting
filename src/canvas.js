
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const CanvasImageRenderer = () => {
  const [canvasHash, setCanvasHash] = useState('');

  useEffect(() => {
    // Get the canvas element
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    // Create an image and wait for it to load
    const image = new Image();
    image.src = process.env.PUBLIC_URL + '/images/canvas.png';

    image.onload = function () {
      // Set canvas size to match image dimensions
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image on the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Get pixel data
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Convert pixel data to grayscale
      const grayscalePixels = [];
      for (let i = 0; i < pixels.length; i += 4) {
        const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        grayscalePixels.push(avg);
      }

      // Hash grayscale pixel data to create a unique ID
      const hash = CryptoJS.SHA256(grayscalePixels.join('')).toString();

      // Log the hashed ID to the console
      // console.log('Hashed ID:', hash);

      // Set the hash in the component's state
      setCanvasHash(hash);

    axios.post('https://browserfapp.azurewebsites.net/api/saveHash', { hash })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error storing Canvas hash:', error.message);
        });

    };
  }, []);


  return (
    <div>
      <h3>Canvas Image Renderer</h3>
      <canvas id="myCanvas" style={{ border: '1px solid #000' }}></canvas>
      <p>Canvas Hash: {canvasHash}</p>
    </div>
  );
};

export default CanvasImageRenderer;
