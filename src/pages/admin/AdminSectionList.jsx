import { useEffect, useState } from "react";
import { API_BASE } from "../../services/http";
import { Helmet } from "react-helmet-async";

export default function AdminSectionList() {
  const [sections, setSections] = useState([]);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/content/admin/sections`, {
      headers: {
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
      },
    })
      .then((r) => r.json())
      .then(setSections);
  }, []);

  function onDrop(target) {
    if (!dragging || dragging === target) return;

    const updated = [...sections];
    const from = updated.findIndex((s) => s.name === dragging);
    const to = updated.findIndex((s) => s.name === target);

    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);

    const withOrder = updated.map((s, i) => ({
      ...s,
      order: i + 1,
    }));

    setSections(withOrder);

    fetch(`${API_BASE}/api/content/admin/update-section-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
      },
      body: JSON.stringify({
        items: withOrder.map((s) => ({
          name: s.name,
          order: s.order,
        })),
      }),
    });
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="mt-10 space-y-3">
        <h2 className="font-bold text-xl">Sections (Drag to reorder)</h2>

        {sections.map((s) => (
          <div
            key={s.name}
            draggable
            onDragStart={() => setDragging(s.name)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(s.name)}
            className="flex justify-between items-center p-4 border rounded bg-white cursor-move"
          >
            <div>
              <b>{s.name.toUpperCase()}</b>
              <span className="ml-2 text-sm text-gray-500">
                Order: {s.order}
              </span>
            </div>

            <button
              onClick={async () => {
                const res = await fetch(
                  `${API_BASE}/api/content/admin/toggle-section`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
                    },
                    body: JSON.stringify({ name: s.name }),
                  }
                );

                const data = await res.json();
                setSections((prev) =>
                  prev.map((p) =>
                    p.name === s.name ? { ...p, enabled: data.enabled } : p
                  )
                );
              }}
              className={`px-3 py-1 rounded text-sm ${
                s.enabled
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {s.enabled ? "Enabled" : "Disabled"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
