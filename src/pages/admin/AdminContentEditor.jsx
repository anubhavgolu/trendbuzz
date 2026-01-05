import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { API_BASE } from "../../services/http";
import AdminCardList from "./AdminCardList";
import AdminSectionList from "./AdminSectionList";

const SECTIONS = [
  "top",
  "tech",
  "news",
  "entertainment",
  "memes",
  "social",
  "video",
];

export default function AdminContentEditor() {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    image: "",
    section: "top",
    order: 1,
    type: "news",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    sourceName: "",
    sourceUrl: "",
    imageSource: "",
  });

  const [editingId, setEditingId] = useState(null); // 🔥 EDIT MODE
  const [loading, setLoading] = useState(false);
  const [sectionEnabled, setSectionEnabled] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  /* ================= LOAD SECTION STATUS ================= */
  useEffect(() => {
    async function loadSectionStatus() {
      try {
        const res = await fetch(`${API_BASE}/api/content/admin/sections`, {
          headers: {
            "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
          },
        });

        const sections = await res.json();
        const current = sections.find((s) => s.name === form.section);

        if (current) setSectionEnabled(current.enabled);
      } catch (err) {
        console.error("Section load error", err);
      }
    }

    loadSectionStatus();
  }, [form.section]);

  /* ================= HANDLERS ================= */
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  /* ================= EDIT HANDLER ================= */
  function handleEdit(item) {
    setEditingId(item._id);

    setForm({
      title: item.title || "",
      summary: item.summary || "",
      image: item.image || "",
      section: item.section,
      order: item.order,
      type: item.type || "news",
      seoTitle: item.seoTitle || "",
      seoDescription: item.seoDescription || "",
      keywords: Array.isArray(item.keywords?.manual)
        ? item.keywords.manual.join(", ")
        : "",
      publishedAt: item.publishedAt ? item.publishedAt.slice(0, 10) : "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit() {
    setLoading(true);

    const res = await fetch(`${API_BASE}/api/content/admin/upsert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
      },
      body: JSON.stringify({
        ...form,
        _id: editingId || undefined,
        keywords: form.keywords, // ✅ STRING ONLY
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert(editingId ? "✏️ Content updated" : "✅ Content added");

      setForm({
        title: "",
        summary: "",
        image: "",
        section: form.section,
        order: 1,
        type: "news",
        seoTitle: "",
        seoDescription: "",
        keywords: "",
        publishedAt: "",
      });

      setEditingId(null);
      setRefreshKey((k) => k + 1);
    } else {
      alert("❌ Error saving content");
    }
  }

  /* ================= TOGGLE SECTION ================= */
  async function toggleSection() {
    const res = await fetch(`${API_BASE}/api/content/admin/toggle-section`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
      },
      body: JSON.stringify({ section: form.section }),
    });

    const data = await res.json();
    setSectionEnabled(data.enabled);
    setRefreshKey((k) => k + 1);
  }

  /* ================= UI ================= */
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Admin – Content Editor</title>
      </Helmet>

      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-extrabold mb-6">
          🧠 Admin Content Editor
        </h1>

        <div className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-3 rounded"
          />

          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Summary"
            rows={4}
            className="w-full border p-3 rounded"
          />

          <input
            name="image"
            value={form.image}
            type="url"
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border p-3 rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="section"
              value={form.section}
              onChange={handleChange}
              className="border p-3 rounded"
            >
              {SECTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>

            <select
              name="order"
              value={form.order}
              onChange={handleChange}
              className="border p-3 rounded"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  Order {n}
                </option>
              ))}
            </select>
          </div>

          <input
            name="seoTitle"
            value={form.seoTitle}
            onChange={handleChange}
            placeholder="SEO Title (optional)"
            className="w-full border p-3 rounded"
          />

          <textarea
            name="seoDescription"
            value={form.seoDescription}
            onChange={handleChange}
            placeholder="SEO Description (optional)"
            rows={2}
            className="w-full border p-3 rounded"
          />
          <input
            type="date"
            name="publishedAt"
            value={form.publishedAt}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            max={new Date().toISOString().split("T")[0]}
          />

          <input
            name="sourceName"
            value={form.sourceName}
            onChange={handleChange}
            placeholder="Source Name (e.g. Reuters, BBC, TrendBuzzs Desk)"
            className="w-full border p-3 rounded"
          />

          <input
            name="sourceUrl"
            value={form.sourceUrl}
            onChange={handleChange}
            placeholder="Source URL (original article link)"
            className="w-full border p-3 rounded"
          />

          <input
            name="imageSource"
            value={form.imageSource}
            onChange={handleChange}
            placeholder="Image Source (Pixabay / Unsplash / AP)"
            className="w-full border p-3 rounded"
          />

          <input
            name="keywords"
            value={form.keywords}
            onChange={handleChange}
            placeholder="Keywords (comma separated)"
            className="w-full border p-3 rounded"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-3 rounded font-semibold"
          >
            {loading
              ? "Saving…"
              : editingId
              ? "Update Content"
              : "Save Content"}
          </button>

          {/* ===== SECTION TOGGLE ===== */}
          <div className="flex items-center justify-between mt-6 p-4 border rounded">
            <div>
              <h3 className="font-bold text-lg">
                Section: {form.section.toUpperCase()}
              </h3>
              <p className="text-sm text-gray-600">
                Status:{" "}
                {sectionEnabled ? (
                  <span className="text-green-600 font-semibold">ENABLED</span>
                ) : (
                  <span className="text-red-600 font-semibold">DISABLED</span>
                )}
              </p>
            </div>

            <button
              onClick={toggleSection}
              className={`px-4 py-2 rounded text-white ${
                sectionEnabled ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {sectionEnabled ? "Disable Section" : "Enable Section"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    title: "",
                    summary: "",
                    image: "",
                    section: form.section,
                    order: 1,
                    type: "news",
                    seoTitle: "",
                    seoDescription: "",
                    keywords: "",
                  });
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {/* ===== CARD LIST ===== */}
          <AdminCardList
            section={form.section}
            refreshKey={refreshKey}
            onEdit={handleEdit}
          />
          <AdminSectionList />
        </div>
      </div>
    </>
  );
}
