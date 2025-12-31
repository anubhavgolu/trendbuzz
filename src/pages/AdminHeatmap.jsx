import { useEffect, useState } from "react";
import { API_BASE} from "../services/http";

export default function AdminHeatmap() {
  const [data, setData] = useState([]);
  const page = "/"; // change to /search, /trend/xyz

  useEffect(() => {
    fetch(
      `${API_BASE}/api/heatmap?page=${page}`,
      {
        headers: {
          "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
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
  );
}
