import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { CssVarsProvider } from "@mui/joy";

import Toast from "./components/Toast/Toast.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarsProvider>
      <GoogleOAuthProvider clientId="279059219026-j5vltgtijlfgvm4v1qelqjrg4jh2f2qu.apps.googleusercontent.com">
        
        <App />

        <Toast />
        
      </GoogleOAuthProvider>
    </CssVarsProvider>
  </React.StrictMode>
);
