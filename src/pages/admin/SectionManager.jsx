import { useEffect, useState } from "react";
import { API_BASE } from "../../services/http";
import { Helmet } from "react-helmet-async";

export default function SectionManager() {
  const [sections, setSections] = useState([]);
  const [dragId, setDragId] = useState(null);
  const adminKey = import.meta.env.VITE_ADMIN_KEY;

  /* ================= LOAD SECTIONS ================= */
  useEffect(() => {
    loadSections();
  }, []);

  async function loadSections() {
    const res = await fetch(`${API_BASE}/api/content/admin/sections`, {
      headers: { "x-admin-key": adminKey },
    });

    const data = await res.json();
    if (Array.isArray(data)) {
      setSections(data.sort((a, b) => a.order - b.order));
    }
  }

  /* ================= TOGGLE ================= */
  async function toggleSection(name) {
    await fetch(`${API_BASE}/api/content/admin/toggle-section`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ section: name }),
    });

    loadSections();
  }

  /* ================= DRAG ================= */
  function onDragStart(id) {
    setDragId(id);
  }

  async function onDrop(id) {
    if (dragId === id) return;

    const updated = [...sections];
    const from = updated.findIndex((s) => s.name === dragId);
    const to = updated.findIndex((s) => s.name === id);

    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);

    const ordered = updated.map((s, i) => ({
      ...s,
      order: i + 1,
    }));

    setSections(ordered);

    await fetch(`${API_BASE}/api/content/admin/sections/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({
        sections: ordered.map((s) => ({
          name: s.name,
          order: s.order,
        })),
      }),
    });
  }

  /* ================= UI ================= */
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-extrabold mb-6">📂 Section Manager</h1>

        <div className="space-y-3">
          {sections.map((s) => (
            <div
              key={s.name}
              draggable
              onDragStart={() => onDragStart(s.name)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(s.name)}
              className="cursor-move flex items-center justify-between border rounded-lg p-4 bg-white"
            >
              <div>
                <h3 className="font-semibold uppercase">{s.name}</h3>
                <p className="text-sm text-gray-500">
                  Order: {s.order} · {s.enabled ? "🟢 Enabled" : "🔴 Disabled"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleSection(s.name)}
                  className={`px-3 py-1 rounded text-sm text-white ${
                    s.enabled ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {s.enabled ? "Disable" : "Enable"}
                </button>

                <span className="text-gray-400 text-xl">☰</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
