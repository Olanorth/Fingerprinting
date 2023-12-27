// src/index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
// import FP from './getFp';
import {
  FpjsProvider
} from '@fingerprintjs/fingerprintjs-pro-react'
import Home from './getFp';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: "IHTAppkQL12xcrbQpyfw",
        region: "eu"
      }}
    >
        <App />
        <Home />
    </FpjsProvider>
  </React.StrictMode>
)