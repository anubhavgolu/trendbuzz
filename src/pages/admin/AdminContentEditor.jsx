import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAdminAuth } from "./AdminAuthContext";
import { upsertContent } from "../../services/contentAdminApi";

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
  const { adminKey } = useAdminAuth();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
    sourceName: "",
    sourceUrl: "",
    type: "news",
    section: "top",
    order: 1,
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    videoEmbed: "",
    videoThumbnail: "",
  });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    if (!adminKey) return alert("Admin key missing");
    if ((form.type === "social" || form.type === "video") && !form.sourceName) {
      return alert("Source name is required for social/video");
    }

    const payload = {
      title: form.title,
      summary: form.summary,
      content: form.content,
      image: form.image,
      sourceName: form.sourceName,
      sourceUrl: form.sourceUrl,
      type: form.type,
      section: form.section,
      order: Number(form.order),
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
      keywords: form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      video:
        form.type === "video"
          ? {
              embedUrl: form.videoEmbed,
              thumbnail: form.videoThumbnail,
            }
          : undefined,
    };

    await upsertContent(payload, adminKey);
    alert("✅ Content saved / updated");
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Admin – Content Editor</title>
      </Helmet>

      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <h1 className="text-3xl font-extrabold">📝 Content Editor</h1>

        {/* BASIC */}
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-3 rounded"
          value={form.title}
          onChange={update}
        />

        <textarea
          name="summary"
          placeholder="Summary"
          rows={3}
          className="w-full border p-3 rounded"
          value={form.summary}
          onChange={update}
        />

        <textarea
          name="content"
          placeholder="Full content (optional)"
          rows={5}
          className="w-full border p-3 rounded"
          value={form.content}
          onChange={update}
        />

        <input
          name="image"
          placeholder="Image URL"
          className="w-full border p-3 rounded"
          value={form.image}
          onChange={update}
        />

        {/* TYPE + SECTION */}
        <div className="grid md:grid-cols-3 gap-4">
          <select
            name="type"
            value={form.type}
            onChange={update}
            className="border p-3 rounded"
          >
            <option value="news">News</option>
            <option value="social">Social</option>
            <option value="video">Video</option>
          </select>

          <select
            name="section"
            value={form.section}
            onChange={update}
            className="border p-3 rounded"
          >
            {SECTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            name="order"
            type="number"
            min="1"
            max="6"
            placeholder="Order (1–6)"
            className="border p-3 rounded"
            value={form.order}
            onChange={update}
          />
        </div>

        {/* VIDEO FIELDS */}
        {form.type === "video" && (
          <>
            <input
              name="videoEmbed"
              placeholder="Video embed URL"
              className="w-full border p-3 rounded"
              value={form.videoEmbed}
              onChange={update}
            />
            <input
              name="videoThumbnail"
              placeholder="Video thumbnail URL"
              className="w-full border p-3 rounded"
              value={form.videoThumbnail}
              onChange={update}
            />
          </>
        )}

        {/* SOURCE */}
        <input
          name="sourceName"
          placeholder="Source name (e.g. YouTube, X)"
          className="w-full border p-3 rounded"
          value={form.sourceName}
          onChange={update}
        />

        <input
          name="sourceUrl"
          placeholder="Source URL"
          className="w-full border p-3 rounded"
          value={form.sourceUrl}
          onChange={update}
        />

        {/* SEO */}
        <input
          name="seoTitle"
          placeholder="SEO Title (optional)"
          className="w-full border p-3 rounded"
          value={form.seoTitle}
          onChange={update}
        />

        <textarea
          name="seoDescription"
          placeholder="SEO Description (optional)"
          rows={2}
          className="w-full border p-3 rounded"
          value={form.seoDescription}
          onChange={update}
        />

        <input
          name="keywords"
          placeholder="Keywords (comma separated)"
          className="w-full border p-3 rounded"
          value={form.keywords}
          onChange={update}
        />

        <button
          onClick={handleSave}
          className="bg-orange-600 text-white px-6 py-3 rounded font-semibold"
        >
          Save / Update Card
        </button>
      </div>
    </>
  );
}
