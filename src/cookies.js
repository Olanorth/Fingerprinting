import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CheckCookies() {
  const [cookiesEnabled, setCookiesEnabled] = useState(false);
  const [userConsent, setUserConsent] = useState(null);

  useEffect(() => {
    // Function to check if cookies are enabled
    function areCookiesEnabled() {
      const testCookieName = 'testCookie';
      document.cookie = `${testCookieName}=testValue; SameSite=Lax;`;
      const cookiesEnabled = document.cookie.includes(testCookieName);
      document.cookie = `${testCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;`;
      return cookiesEnabled;
    }

    // Check if cookies are enabled
    const isEnabled = areCookiesEnabled();
    setCookiesEnabled(isEnabled);

    // Check if our site has a cookie already saved
    const hasOurCookie = document.cookie.includes('theme=dark');

    // If cookies are enabled and our site doesn't have a cookie, ask for consent
    if (isEnabled && !hasOurCookie) {
      // Ask the user for consent
      const consent = window.confirm('This website uses cookies. Do you consent to the use of cookies?');
      setUserConsent(consent);

      // Save cookie if user consents
      if (consent) {
        // Save a cookie on the user's first visit
        const isFirstVisit = document.cookie.indexOf('visited') === -1;
        if (isFirstVisit) {
          document.cookie = 'visited=true; SameSite=Lax;';
          // console.log('Cookie saved for the first visit.');

          // Make an API request to the server to indicate the first visit
          axios.post('https://browserfapp.azurewebsites.net/api/firstVisit', { isFirstVisit: true })
          .then(response => {
            console.log('Server response:', response.data);
          })
          .catch(error => {
            console.error('Error making API request:', error.message);
          });

        } 
        // Save our site's cookie
        document.cookie = 'theme=dark; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
        // console.log('Cookie saved with user consent.');
      } else {
        // console.log('User declined consent.');
      }
    } else if (isEnabled && hasOurCookie){
        // console.log('Welcome back...')
    }
    else {
      setUserConsent(null); // Reset userConsent if cookies are not enabled or our site has the cookie
    }
  }, []);


  return (
    <div>
      <h2>Cookies Status:</h2>
      <ul>
      <p>{cookiesEnabled ? 'Cookies are enabled' : 'Cookies are disabled'}</p>
      {userConsent !== null && (
        <p>
          {userConsent
            ? 'Cookies saved with user consent.'
            : 'User declined consent or cookies are not enabled.'}
        </p>
      )}
      </ul>
    </div>
  );
}

export default CheckCookies;