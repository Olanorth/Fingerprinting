// // // import React, { useState, useEffect } from 'react';

// // // function FontList() {
// // //   const [fontList, setFontList] = useState([]);

// // //   useEffect(() => {
// // //     // Function to fetch and set the available fonts
// // //     const fetchFonts = () => {
// // //               // Check if the 'fontsloaded' event has occurred
// // //       if (document.fonts && document.fonts.status === 'loaded') {
// // //       // Use the Document object to access the fonts array
// // //       const fontsArray = Array.from(document.fonts);

// // //       // Extract font names from the fonts array
// // //       const fontNames = fontsArray.map((font) => font.family);

// // //       console.log('Font Names:', fontNames);


// // //       // Set the font list in the state
// // //       setFontList(fontNames);
// // //     } else {
// // //         // If 'fontsloaded' event hasn't occurred, listen for it
// // //         document.fonts.addEventListener('loadingdone', fetchFonts);
// // //       }
// // //     };

// // //     // Call the fetchFonts function when the component mounts
// // //     fetchFonts();

// // //     return () => {
// // //         document.fonts.removeEventListener('loadingdone', fetchFonts);
// // //       };
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <h2>Available Fonts:</h2>
// // //       <ul>
// // //         {fontList.length > 0 ? (
// // //           fontList.map((font, index) => <li key={index}>{font}</li>)
// // //         ) : (
// // //           <li>No fonts available</li>
// // //         )}
// // //       </ul>
// // //     </div>
// // //   );
// // // }

// // // export default FontList;

// // FontChecker.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function FontChecker() {
//     const [installedFonts, setInstalledFonts] = useState([]);
  
//     useEffect(() => {
//       async function checkAndStoreFonts() {
//         const fontList = ['Arial', 'Times New Roman', 'Courier New', 'Zero fonts']; // Add more fonts as needed
  
//         // Check if each font is installed
//         const fonts = fontList.filter(font => isFontInstalled(font));
  
//         console.log('Installed Fonts:', fonts);
  
//         // Post the list of installed fonts to the server
//         try {
//           const response = await axios.post('http://localhost:4000/api/storeFontDetails', {
//             installedFonts: fonts,
//           });
  
//           console.log('Font details stored successfully:', response.data);
//         } catch (error) {
//           console.error('Error storing font details:', error.message);
//         }
  
//         // Set the state to update the component with the installed fonts
//         setInstalledFonts(fonts);
//       }
  
//       checkAndStoreFonts();
//     }, []);

//     async function isFontInstalled(fontName) {
//         try {
//           // Load a font using the FontFace API
//           const fontFace = new FontFace(fontName, `url('data:font/woff2;base64,${btoa('')}')`);
      
//           // Add the font to the document
//           document.fonts.add(fontFace);
      
//           // Wait for the font to be loaded
//           await fontFace.loaded;
      
//           // Check if the font is available
//           const fontAvailable = document.fonts.check(`12px ${fontName}`);
          
//           return fontAvailable;
//         } catch (error) {
//           console.error('Error checking font:', error.message);
//           return false;
//         }
//       }
      
  

//   return (
//     <div>
//     <h2>Font Checker</h2>
//     {installedFonts.length > 0 ? (
//       <div>
//         <p>Installed Fonts:</p>
//         <ul>
//           {installedFonts.map((font, index) => (
//             <li key={index}>{font}</li>
//           ))}
//         </ul>
//       </div>
//     ) : (
//       <p>No fonts installed.</p>
//     )}
//   </div>
//   );
// }

// export default FontChecker;
