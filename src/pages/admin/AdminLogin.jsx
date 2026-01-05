import { useState } from "react";
import { useAdminAuth } from "./AdminAuthContext";
import { Helmet } from "react-helmet-async";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [key, setKey] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (key.trim()) {
      login(key.trim());
    }
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow w-full max-w-sm"
        >
          <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>

          <input
            type="password"
            placeholder="Enter Admin Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
