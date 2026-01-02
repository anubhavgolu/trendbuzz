import { useEffect, useState } from "react";
import { API_BASE } from "../services/http";
import { Helmet } from "react-helmet-async";
import { useAdminAuth } from "./admin/AdminAuthContext";

export default function AdminHeatmap() {
  const { adminKey } = useAdminAuth();
  const [data, setData] = useState([]);

  const page = "/"; // change to /search, /trend/xyz

  useEffect(() => {
    if (!adminKey) return;

    fetch(
      `${API_BASE}/api/heatmap?page=${encodeURIComponent(page)}`,
      {
        headers: {
          "x-admin-key": adminKey,
        },
      }
    )
      .then((res) => res.json())
      .then(setData);
  }, [adminKey, page]);

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Admin – Heatmap</title>
      </Helmet>

      <div className="relative w-full h-[80vh] border">
        {data.map((p, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-red-500 rounded-full opacity-40"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
          />
        ))}
      </div>
    </>
  );
}
