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
    content: "",
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
    publishedAt: "",
  });

  const [editingId, setEditingId] = useState(null); // 🔥 EDIT MODE
  const [loading, setLoading] = useState(false);
  const [sectionEnabled, setSectionEnabled] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState({ en: "", hi: "" });
  const [excerpt, setExcerpt] = useState({ en: "", hi: "" });
  const [content, setContent] = useState({ en: "", hi: "" });

  const [seoTitle, setSeoTitle] = useState({ en: "", hi: "" });
  const [seoDescription, setSeoDescription] = useState({ en: "", hi: "" });
  const [langTab, setLangTab] = useState("en");
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState("");

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
    setEditingId(item.id);

    setForm({
      title: item.title || "",
      summary: item.summary || "",
      content: item.content || "",
      image: item.image || "",
      section: item.section || "top",
      order: item.order || 1,
      type: item.type || "news",
      seoTitle: item.seoTitle || "",
      seoDescription: item.seoDescription || "",
      keywords: Array.isArray(item.keywords?.manual)
        ? item.keywords.manual.join(", ")
        : "",
      sourceName: item.sourceName || "",
      sourceUrl: item.sourceUrl || "",
      imageSource: item.imageSource || "",
      publishedAt: item.publishedAt ? item.publishedAt.slice(0, 10) : "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadImage() {
    if (!imageFile) {
      return form.image || "";
    }

    const fd = new FormData();
    fd.append("image", imageFile);

    const res = await fetch(`${API_BASE}/api/content/admin/upload-image`, {
      method: "POST",
      headers: {
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
      },
      body: fd,
    });

    const data = await res.json();

    console.log("📦 uploadImage response:", data);

    if (!data || data.success !== true || !data.image) {
      throw new Error("Invalid image upload response");
    }

    return data.image;
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit() {
    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      const payload = {
        ...form,

        // 🔥 REQUIRED FIELDS – force safe values
        title: form.title || "",
        summary: form.summary || "",
        content: form.content || "",
        section: form.section || "news",
        order: Number(form.order) || 1, // 🔥 VERY IMPORTANT

        // 🔥 image always string
        image: typeof imageUrl === "string" ? imageUrl : form.image || "",

        // 🔥 backend-compatible keywords
        keywords:
          typeof form.keywords === "string"
            ? form.keywords
            : Array.isArray(form.keywords)
            ? form.keywords.join(", ")
            : "",

        // 🔥 only when editing
        ...(editingId ? { id: editingId } : {}),
      };

      if (!payload.content || payload.content.length < 10) {
        alert("Main article content required");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/content/admin/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");

      alert(editingId ? "✏️ Content updated" : "✅ Content added");

      setImageFile(null);
      setEditingId(null);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving content");
    } finally {
      setLoading(false);
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

  async function saveArticle() {
    try {
      setSaving(true);
      const finalTitle = {
        en: title.en || title.hi,
        hi: title.hi,
      };

      const finalContent = {
        en: content.en || content.hi,
        hi: content.hi,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/articles/admin/upsert`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
          },
          body: JSON.stringify({
            title: finalTitle,
            content: finalContent,
            excerpt,
            image,
            seoTitle,
            seoDescription,
            featured,
            enabled: true,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Save failed");
        return;
      }

      alert("✅ Article saved successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    } finally {
      setSaving(false);
    }
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
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Main Article Content (HTML allowed: <h2>, <h3>, <p>, <ul>, FAQ)"
            rows={12}
            className="w-full border p-3 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
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
        {/* ================= ARTICLE ADMIN PANEL ================= */}
        <div className="border-2 border-dashed rounded-xl p-6 bg-gray-50 mt-10">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900">
            ✍️ ARTICLE ADMIN PANEL
          </h2>

          {/* LANGUAGE TABS */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setLangTab("en")}
              className={`px-3 py-1 rounded ${
                langTab === "en" ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLangTab("hi")}
              className={`px-3 py-1 rounded ${
                langTab === "hi" ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* ARTICLE FIELDS */}
          <input
            type="text"
            placeholder={`Title (${langTab.toUpperCase()})`}
            value={title[langTab]}
            onChange={(e) => setTitle({ ...title, [langTab]: e.target.value })}
            className="w-full border p-3 mb-3 rounded"
          />

          <textarea
            placeholder={`Excerpt (${langTab.toUpperCase()})`}
            value={excerpt[langTab]}
            onChange={(e) =>
              setExcerpt({ ...excerpt, [langTab]: e.target.value })
            }
            className="w-full border p-3 mb-3 rounded"
          />

          <textarea
            placeholder={`Content (${langTab.toUpperCase()})`}
            value={content[langTab]}
            onChange={(e) =>
              setContent({ ...content, [langTab]: e.target.value })
            }
            className="w-full border p-3 h-48 rounded"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              SEO Title ({langTab.toUpperCase()})
            </label>

            <input
              type="text"
              placeholder={`SEO Title (${langTab.toUpperCase()})`}
              value={seoTitle[langTab]}
              onChange={(e) =>
                setSeoTitle({ ...seoTitle, [langTab]: e.target.value })
              }
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              SEO Description ({langTab.toUpperCase()})
            </label>

            <textarea
              placeholder={`SEO Description (${langTab.toUpperCase()})`}
              value={seoDescription[langTab]}
              onChange={(e) =>
                setSeoDescription({
                  ...seoDescription,
                  [langTab]: e.target.value,
                })
              }
              className="w-full border rounded p-2 h-20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Featured Image (URL)
            </label>

            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border rounded p-2"
            />

            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-3 w-full max-w-md rounded-lg border"
              />
            )}
          </div>

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span className="text-sm">Mark as Featured</span>
          </label>

          {/* SAVE ARTICLE BUTTON */}
          <button
            onClick={saveArticle}
            disabled={saving}
            className={`mt-6 px-6 py-3 rounded text-white font-semibold ${
              saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {saving ? "Saving..." : "Save Article"}
          </button>
        </div>
      </div>
    </>
  );
}
