// // src/App.jsx
// import React, { useEffect, useState } from 'react';
// import { FpjsProvider, useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
// import axios from 'axios';

// const FP = () => {
// //   const { fingerprint, error } = useVisitorData();

//     const { data: fingerprint, error } = useVisitorData();

//   const [serverResponse, setServerResponse] = useState(null);

//   useEffect(() => {
//     if (error) {
//       console.error('Fingerprinting error:', error);
//     }

//     if (fingerprint) {
//       console.log('Fingerprint:', fingerprint.visitorId);

//       // Send the fingerprint to the server
//       axios.post('http://localhost:4000/api/fingerprint', { fingerprint })
//         .then(response => {
//           console.log('Server response:', response.data);
//           setServerResponse(response.data);
//         })
//         .catch(error => {
//           console.error('Error sending fingerprint to the server:', error.message);
//         });
//     }
//   }, [fingerprint, error]);

//   return (
//     <FpjsProvider>
//     <div>
//       <h1>Fingerprint Display</h1>
//       {fingerprint && (
//         <div>
//           <p>Fingerprint: {fingerprint}</p>
//           {serverResponse && <p>Server Response: {JSON.stringify(serverResponse)}</p>}
//         </div>
//       )}
//     </div>
//     </FpjsProvider>
//   );
// };

// export default FP;


// src/App.jsx
import {useVisitorData} from '@fingerprintjs/fingerprintjs-pro-react'

export default function Home() {
  const {isLoading, error, data, getData} = useVisitorData(
    {extendedResult: true},
    {immediate: true}
  )


  return (
    <div>
      <button onClick={() => getData({ignoreCache: true})}>
        Reload data
      </button>
      <p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
      <p>Full visitor data:</p>
      <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}