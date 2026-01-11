import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.css";
import "./styles/worldcup.css";
import AdminAuthProvider from "./pages/admin/AdminAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
