import { useEffect, useState } from "react";
import AdminToggle from "./AdminToggle";
import {
  getActiveManualNews,
  updateManualNews,
  toggleManualNews,
} from "../../services/adminApi";
import { Helmet } from "react-helmet-async";
import { useAdminAuth } from "./AdminAuthContext";

export default function AdminManualNews() {
  const { adminKey } = useAdminAuth();

  const [news, setNews] = useState(null);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    image: "",
    category: "news",
    source: "",
    keywords: "",
    enabled: false,
  });

  useEffect(() => {
    if (!adminKey) return;

    getActiveManualNews(adminKey).then((data) => {
      if (data) {
        setNews(data);
        setForm({
          title: data.title || "",
          summary: data.summary || "",
          image: data.image || "",
          category: data.category || "news",
          source: data.source || "",
          keywords: data.keywords?.manual?.join(", ") || "",
          enabled: data.enabled || false,
        });
      }
    });
  }, [adminKey]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    if (!adminKey) return alert("Admin key missing");

    await updateManualNews(
      {
        ...form,
        keywords: form.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      },
      adminKey
    );

    alert("✅ Manual News Updated");
  }

  async function handleToggle() {
    if (!adminKey) return;

    const res = await toggleManualNews(adminKey);
    setForm((f) => ({ ...f, enabled: res.enabled }));
  }

  async function handleDelete() {
    if (!adminKey) return;

    await fetch("/api/manual-news/delete", {
      method: "DELETE",
      headers: {
        "x-admin-key": adminKey,
      },
    });

    alert("🗑️ Manual news deleted");
    window.location.reload();
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Admin – Manual News</title>
      </Helmet>

      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-extrabold mb-6">
          📰 Manual News Control
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <span className="font-semibold">Status:</span>
          <AdminToggle enabled={form.enabled} onToggle={handleToggle} />
        </div>

        <div className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="News Title"
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
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border p-3 rounded"
          />

          <input
            name="keywords"
            value={form.keywords}
            onChange={handleChange}
            placeholder="Keywords (comma separated)"
            className="w-full border p-3 rounded"
          />

          <input
            name="source"
            value={form.source}
            onChange={handleChange}
            placeholder="Source (e.g. Admin Desk)"
            className="w-full border p-3 rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="news">News</option>
            <option value="tech">Tech</option>
            <option value="science">Science</option>
            <option value="entertainment">Entertainment</option>
            <option value="general">General</option>
          </select>

          <button
            onClick={handleSave}
            className="bg-orange-500 text-white px-6 py-3 rounded font-semibold"
          >
            Save / Update
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete News
          </button>
        </div>
      </div>
    </>
  );
}
