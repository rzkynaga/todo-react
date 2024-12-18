import React from "react";
import ReactDOM from "react-dom/client"; // Import sesuai React 18
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Gunakan createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);