import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBySlug } from "../services/contentApi";
import SEO from "../components/SEO";
import NewsSchema from "../components/NewsSchema";
import ContentHero from "../components/ContentHero";
import HeroSkeleton from "../components/skeletons/HeroSkeleton";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import AdSlot from "../components/AdSlot";

export default function ContentDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      const data = await fetchBySlug(slug);
      if (mounted) {
        setItem(data);
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <HeroSkeleton />
      </main>
    );
  }

  if (!item) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Content not found</h2>
        <p className="text-gray-500 mt-2">
          This article may be removed or hidden.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 text-orange-600 font-semibold"
        >
          ← Back to Home
        </Link>
      </div>
    );
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
    section,
    type,
  } = item;

  /* ================= RENDER ================= */

  return (
    <>
      {/* 🔍 SEO */}
      <SEO
        title={seoTitle || title}
        description={seoDescription || summary}
        keywords={keywords?.combined?.join(", ")}
        canonical={`https://www.trendbuzzs.com/trend/${slug}`}
      />

      {/* 🧭 Breadcrumbs */}
      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "https://www.trendbuzzs.com/",
          },
          {
            name: item.section || "News",
            url: `https://www.trendbuzzs.com/category/${item.section}`,
          },
          {
            name: title,
            url: `https://www.trendbuzzs.com/trend/${slug}`,
          },
        ]}
      />

      {/* 🧠 Article Schema */}
      <NewsSchema
        title={title}
        description={summary}
        image={image || video?.thumbnail}
        slug={`trend/${slug}`}
        publishedAt={publishedAt}
        category={item.section}
      />

      {/* 🔥 HERO */}
      <ContentHero
        title={title}
        summary={summary}
        image={image}
        sourceName={sourceName}
        publishedAt={publishedAt}
      />

      {/* ================= BODY ================= */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          {item.section && (
            <span className="inline-block mb-3 text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
              {item.section.toUpperCase()}
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500 items-center">
          {/* DATE */}
          {item.createdAt && (
            <span>
              🗓️{" "}
              {new Date(item.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}

          {/* NEWS SOURCE */}
          {sourceName && <span>• 📰 {sourceName}</span>}

          {/* IMAGE SOURCE */}
          {(item.imageSource || image) && (
            <span className="text-xs text-gray-400">
              • 📸{" "}
              {item.imageSource
                ? item.imageSource
                : image?.includes("unsplash")
                ? "Unsplash"
                : image?.includes("pixabay")
                ? "Pixabay"
                : "Image Source"}
            </span>
          )}

          {/* SOURCE LINK */}
          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-orange-600 hover:underline text-xs"
            >
              View Source
            </a>
          )}
        </div>

        {/* VIDEO */}
        {type === "video" && video?.embedUrl && (
          <div className="mb-8 aspect-video">
            <iframe
              src={video.embedUrl}
              className="w-full h-full rounded-xl"
              loading="lazy"
              allowFullScreen
              title={title}
            />
          </div>
        )}

        {/* FULL CONTENT */}
        {content && (
          <>
            <div className="prose prose-lg max-w-none mt-8">{content}</div>

            <AdSlot slot="3456789012" />
          </>
        )}

        {/* SOURCE */}
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

        {/* TAGS */}
        {keywords?.combined?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {keywords.combined.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* BACK */}
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
