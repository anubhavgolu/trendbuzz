import { useEffect, useState } from "react";
import { API_BASE} from "../services/http";
import { ADMIN_KEY } from "../services/http";
import { Helmet } from "react-helmet-async";

export default function AdminHeatmap() {
  const [data, setData] = useState([]);
  const page = "/"; // change to /search, /trend/xyz

  useEffect(() => {
    fetch(
      `${API_BASE}/api/heatmap?page=${encodeURIComponent(page)}`,
      {
        headers: {
          "x-admin-key": ADMIN_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <> <Helmet>
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
    </div></>
    
  );
}
