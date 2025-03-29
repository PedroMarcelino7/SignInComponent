import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="279059219026-j5vltgtijlfgvm4v1qelqjrg4jh2f2qu.apps.googleusercontent.com">
      <App />
      <ToastContainer position="top-right" autoClose={2000} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
