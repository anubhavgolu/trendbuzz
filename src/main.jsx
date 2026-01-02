import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.css";
import { AdminAuthProvider } from "./admin/AdminAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
 <HelmetProvider>
  <AdminAuthProvider>
    <App />
  </AdminAuthProvider>
</HelmetProvider>
);
