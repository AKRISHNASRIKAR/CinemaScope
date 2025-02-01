// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-elsgrcg0i2krz68n.us.auth0.com" // Auth0 domain
      clientId="oYr0qc7FBGOv5JRWO1aGcX47BlJi0rrI"      // Client ID
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);