import { createContext, useContext, useState } from "react";
import { Helmet } from "react-helmet-async";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminKey, setAdminKey] = useState(
    localStorage.getItem("admin_key") || ""
  );

  function login(key) {
    localStorage.setItem("admin_key", key);
    setAdminKey(key);
  }

  function logout() {
    localStorage.removeItem("admin_key");
    setAdminKey("");
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthContext.Provider value={{ adminKey, login, logout }}>
        {children}
      </AdminAuthContext.Provider>
    </>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

/* 🔥 DEFAULT EXPORT ADD */
export default AdminAuthProvider;
