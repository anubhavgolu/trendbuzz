import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [adminKey, setAdminKey] = useState(
    sessionStorage.getItem("adminKey")
  );

  function login(key) {
    sessionStorage.setItem("adminKey", key);
    setAdminKey(key);
  }

  function logout() {
    sessionStorage.removeItem("adminKey");
    setAdminKey(null);
  }

  return (
    <AdminAuthContext.Provider value={{ adminKey, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
