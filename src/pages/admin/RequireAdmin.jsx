import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";
import AdminLogin from "./AdminLogin";

export default function RequireAdmin({ children }) {
  const { adminKey } = useAdminAuth();

  if (!adminKey) {
    return <AdminLogin />;
  }

  return children;
}
