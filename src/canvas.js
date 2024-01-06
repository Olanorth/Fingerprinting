import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const CanvasImageRenderer = () => {
  const canvasRef = useRef(null);
  const [fingerprintHash, setFingerprintHash] = useState('');
  // const [canvasImageSrc, setCanvasImageSrc] = useState('');


  useEffect(() => {
    const generateCanvasFingerprint = async () => {
      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Canvas rendering logic
        // ...

        // Set canvas dimensions
        canvas.width = 200;
        canvas.height = 100;

        // Draw text with a fake font
        ctx.font = '20px FakeFont';
        ctx.fillStyle = '#000';
        ctx.fillText('Yxskaftbud, ge vår WC-zonmöIQ-hjälp', 10, 20);

        // Draw text with Arial font
        ctx.font = '20px Arial';
        ctx.fillText('Gud hjälpe Zorns mö qvickt få byxa', 10, 50);

        // Draw symbols and emojis
        ctx.font = '30px Arial';
        ctx.fillText('🎨🔐🌐', 10, 80);

        // Draw rotated rectangle
        ctx.save();
        ctx.translate(150, 75);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-10, -10, 20, 20);
        ctx.restore();

        // Draw mathematical functions
        drawMathFunctions(ctx);

        // Draw ellipses with different colors and transparency
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.ellipse(
            fixedX[i],       // Use predetermined X coordinate
            fixedY[i],       // Use predetermined Y coordinate
            fixedWidth[i],   // Use predetermined width
            fixedHeight[i],  // Use predetermined height
            0,
            0,
            2 * Math.PI
          );
          ctx.fillStyle = fixedColor[i];  // Use predetermined color
          ctx.globalAlpha = fixedAlpha[i]; // Use predetermined alpha
          ctx.fill();
        }
        // Convert canvas to data URL
        const dataURL = canvas.toDataURL();

        const hash = await sha256(dataURL);

        // Use dataURL as the canvas fingerprint
        // console.log(dataURL);

        // Set the fingerprint URL state
        setFingerprintHash(hash);

        // setCanvasImageSrc(dataURL);

        logToFingerprintServer(hash);
      } catch (error) {
        console.error('Error generating or logging fingerprint:', error.message);
      }
    };

    const logToFingerprintServer = async (hash) => {
      const hashString = hash.toString(); // Convert the hash to a string

      try {
        const response = await axios.post('https://browserfapp.azurewebsites.net/can', { hash: hashString });
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    const sha256 = async (data) => {
      const encoder = new TextEncoder();
      const buffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    };

    function drawMathFunctions(ctx) {
      const interval = 2 * Math.PI / 100;
      ctx.strokeStyle = 'red';
    
      // Draw sine function
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const x = i * interval;
        const y = Math.sin(x) * 20 + 50;
        ctx.lineTo(i * 2, y);
      }
      ctx.stroke();
    
      // Draw cosine function
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const x = i * interval;
        const y = Math.cos(x) * 20 + 50;
        ctx.lineTo(i * 2, y);
      }
      ctx.stroke();
    
      // Draw linear functions
      ctx.strokeStyle = 'green';
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const x = i * interval;
        const y = 0.1 * x * x - 10 * x + 150;
        ctx.lineTo(i * 2, y);
      }
      ctx.stroke();
    
      ctx.strokeStyle = 'purple';
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const x = i * interval;
        const y = -0.1 * x * x + 10 * x + 50;
        ctx.lineTo(i * 2, y);
      }
      ctx.stroke();
    }
    
    // Fixed positions for ellipses
    const fixedX = [30, 70, 110, 150, 190];
    const fixedY = [30, 70, 30, 70, 30];
    const fixedWidth = [20, 30, 25, 15, 20];
    const fixedHeight = [15, 20, 25, 30, 20];
    const fixedColor = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
    const fixedAlpha = [0.8, 0.6, 0.7, 0.9, 0.5];
    


    generateCanvasFingerprint();
  }, []);

  return (
    <div>
      <p>Canvas Fingerprint Hash:</p>
      <pre>{fingerprintHash}</pre>
      {/* <img
        src={canvasImageSrc}
        alt="Canvas Fingerprint"
        style={{ border: '1px solid #000' }}
      /> */}
      <canvas
        ref={canvasRef}
        width={200}
        height={100}
        style={{ display: 'none' }} // Hide the canvas element
      />
    </div>
  );
};

export default CanvasImageRenderer;