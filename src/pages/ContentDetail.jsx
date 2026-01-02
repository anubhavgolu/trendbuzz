import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBySlug } from "../services/contentApi";
import SEO from "../components/SEO";
import NewsSchema from "../components/NewsSchema";

export default function ContentDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchBySlug(slug).then(setItem);
  }, [slug]);

  if (!item) {
    return <p className="p-10">Loading…</p>;
  }

  const {
    title,
    summary,
    content,
    image,
    video,
    sourceName,
    sourceUrl,
    keywords,
    seoTitle,
    seoDescription,
    publishedAt,
    category,
    type,
  } = item;

  return (
    <>
      {/* 🔍 SEO */}
      <SEO
        title={seoTitle || title}
        description={seoDescription || summary}
        keywords={keywords?.combined?.join(", ")}
      />

      {/* 🧠 Structured Data (News / Video) */}
      <NewsSchema
        title={title}
        description={summary}
        image={image || video?.thumbnail}
        slug={slug}
        publishedAt={publishedAt}
        category={category}
        type={type}
        video={video}
      />

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          {title}
        </h1>

        {/* META */}
        <p className="mt-3 text-sm text-gray-500">
          {sourceName && <>Via {sourceName}</>}
          {publishedAt && (
            <>
              {" "}
              ·{" "}
              {new Date(publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </>
          )}
        </p>

        {/* IMAGE */}
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full max-h-[480px] object-contain rounded-xl my-6"
          />
        )}

        {/* VIDEO (SAFE EMBED) */}
        {type === "video" && video?.embedUrl && (
          <div className="my-8 aspect-video">
            <iframe
              src={video.embedUrl}
              className="w-full h-full rounded-xl"
              loading="lazy"
              allowFullScreen
              title={title}
            />
          </div>
        )}

        {/* SUMMARY */}
        <p className="text-lg text-gray-700 leading-relaxed mt-6">
          {summary}
        </p>

        {/* FULL CONTENT (OPTIONAL) */}
        {content && (
          <div className="prose prose-lg max-w-none mt-8">
            {content}
          </div>
        )}

        {/* SOURCE LINK */}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 text-sm font-semibold text-orange-600 hover:underline"
          >
            View original source →
          </a>
        )}

        {/* HASHTAGS */}
        {keywords?.combined?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {keywords.combined.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* BACK LINK */}
        <div className="mt-12">
          <Link
            to="/"
            className="text-sm font-semibold text-orange-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
