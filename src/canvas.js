// import React, { useEffect } from 'react';

// const CanvasImageRenderer = () => {
//   useEffect(() => {
//     // Get the canvas element
//     const canvas = document.getElementById('myCanvas');
//     const context = canvas.getContext('2d');

//     // Draw a red rectangle on the canvas
//     context.fillStyle = 'red';
//     context.fillRect(50, 50, 400, 200);

//     // Draw text on the canvas
//     context.font = '10px Arial';
//     context.fillStyle = 'white';
//     context.fillText('Hello, this photo says more about you', 70, 120);

//     // Create an image and draw it on the canvas
//     const image = new Image();
//     // image.src = process.env.PUBLIC_URL + '/images/hacked.jpeg';

//     image.onload = function () {
//       context.drawImage(image, 0, 0, canvas.width, canvas.height);

//       canvas.width = image.width;
//       canvas.height = image.height;

//             // Set willReadFrequently to true before performing getImageData
//             context.imageSmoothingEnabled = true;
//             context.imageSmoothingQuality = 'high';


//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//       const pixels = imageData.data;

//       // Limit the loop for debugging (e.g., first 10 pixels)
//       // const limit = Math.min(10, canvas.width * canvas.height);  

// // Log pixel data to the console
// const limit = 10; // Limit the number of iterations for debugging
// for (let y = 0; y < Math.min(canvas.height, limit); y++) {
//   for (let x = 0; x < Math.min(canvas.width, limit); x++) {
//     const index = (y * canvas.width + x) * 4;
//     const red = pixels[index];
//     const green = pixels[index + 1];
//     const blue = pixels[index + 2];
//     const alpha = pixels[index + 3];

//     console.log(`Pixel at position (${x}, ${y}): R=${red}, G=${green}, B=${blue}, A=${alpha}`);
//   }
// }

//     };
//   }, []);

//   return (
//     <div>
//       <h3>Canvas Image Renderer</h3>
//       <canvas id="myCanvas" width="400" height="200" style={{ border: '1px solid #000' }}></canvas>
//     </div>
//   );
// };

// export default CanvasImageRenderer;

// import React, { useEffect } from 'react';
// import CryptoJS from 'crypto-js';


// const CanvasImageRenderer = () => {
//   useEffect(() => {
//     // Get the canvas element
//     const canvas = document.getElementById('myCanvas');
//     const context = canvas.getContext('2d');

//     // Create an image and wait for it to load
//     const image = new Image();
//     image.src = process.env.PUBLIC_URL + '/images/canvas.png';

//     image.onload = function () {
//       // Set canvas size to match image dimensions
//       canvas.width = image.width;
//       canvas.height = image.height;

//       // Draw the image on the canvas
//       context.drawImage(image, 0, 0, canvas.width, canvas.height);

//       // Get pixel data
//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//       const pixels = imageData.data;

//       let prevPixel = null;

//       // Log pixel data to the console
//       for (let y = 0; y < Math.min(canvas.height, 10); y++) {
//         for (let x = 0; x < Math.min(canvas.width, 10); x++) {
//           const index = (y * canvas.width + x) * 4;
//           const red = pixels[index];
//           const green = pixels[index + 1];
//           const blue = pixels[index + 2];
//           const alpha = pixels[index + 3];

//           const currentPixel = { red, green, blue, alpha };

//           // Check if the current pixel values are different from the previous ones
//           if (JSON.stringify(currentPixel) !== JSON.stringify(prevPixel)) {
//             console.log(`Pixel at position (${x}, ${y}): R=${red}, G=${green}, B=${blue}, A=${alpha}`);
//           }
      
//           // Update the previous pixel
//           prevPixel = currentPixel;
//         }
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h3>Canvas Image Renderer</h3>
//       <canvas id="myCanvas" style={{ border: '1px solid #000' }}></canvas>
//     </div>
//   );
// };


// export default CanvasImageRenderer;

import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const CanvasImageRenderer = () => {
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
      const hash = CryptoJS.SHA256(grayscalePixels.toString()).toString();

      // Log the hashed ID to the console
      // console.log('Hashed ID:', hash);

    axios.post('http://localhost:8080/api/saveHash', { hash })
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
    </div>
  );
};

export default CanvasImageRenderer;
