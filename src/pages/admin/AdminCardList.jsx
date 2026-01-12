import { useEffect, useState } from "react";
import { API_BASE } from "../../services/http";
import { Helmet } from "react-helmet-async";

export default function AdminCardList({ section, refreshKey, onEdit }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState(null);

  /* ================= LOAD CARDS ================= */
  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const res = await fetch(`${API_BASE}/api/content/admin/list`, {
          headers: {
            "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
          },
        });

        const data = await res.json();
        if (!Array.isArray(data)) {
          setItems([]);
          return;
        }

        const filtered = data
          .filter(
            (i) =>
              typeof i.section === "string" &&
              i.section.toLowerCase() === section.toLowerCase()
          )
          .sort((a, b) => a.order - b.order);

        setItems(filtered);
      } catch (err) {
        console.error("❌ Admin list error", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [section, refreshKey]);

  /* ================= DRAG & DROP ================= */
  function onDragStart(id) {
    setDraggingId(id);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  async function onDrop(targetId) {
    if (!draggingId || draggingId === targetId) return;

    const newItems = [...items];
    const fromIndex = newItems.findIndex((i) => i._id === draggingId);
    const toIndex = newItems.findIndex((i) => i._id === targetId);

    if (fromIndex === -1 || toIndex === -1) return;

    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);

    const reordered = newItems.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setItems(reordered);
    setDraggingId(null);

    // 🔥 SAVE ORDER TO BACKEND
    await fetch(`${API_BASE}/api/content/admin/update-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
      },
      body: JSON.stringify({
        items: reordered.map((i) => ({
          id: i._id,
          order: i.order,
        })),
      }),
    });
  }

  /* ================= RENDER ================= */
  if (loading) {
    return <p className="mt-6 text-sm text-gray-500">Loading cards…</p>;
  }

  if (items.length === 0) {
    return (
      <p className="mt-6 text-sm text-gray-500">
        No cards in <b>{section}</b> section
      </p>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="mt-8 space-y-3">
        <h2 className="font-bold text-lg">
          Cards in {section.toUpperCase()} (Drag to reorder)
        </h2>

        {items.map((item) => (
          <div
            key={item.slug || `${item.section}-${item.order}`}
            draggable
            onDragStart={() => onDragStart(item._id)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(item._id)}
            className="cursor-move border rounded-lg p-4 bg-white flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                Order: {item.order} ·{" "}
                {item.enabled ? "🟢 Visible" : "🔴 Hidden"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* ✏️ EDIT */}
              <button
                onClick={() => onEdit(item)}
                className="text-sm px-3 py-1 rounded bg-blue-100 hover:bg-blue-200"
              >
                Edit
              </button>

              {/* 👁️ TOGGLE */}
              <button
                onClick={async () => {
                  await fetch(`${API_BASE}/api/content/admin/toggle-card`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
                    },
                    body: JSON.stringify({
                      id: item._id,
                    }),
                  });

                  setItems((prev) =>
                    prev.map((p) =>
                      p._id === item._id ? { ...p, enabled: !p.enabled } : p
                    )
                  );
                }}
                className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
              >
                Toggle
              </button>

              {/* DRAG HANDLE */}
              <span className="text-gray-400 cursor-move">☰</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
