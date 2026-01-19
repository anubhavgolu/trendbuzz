import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBySlug } from "../services/contentApi";
import SEO from "../components/SEO";
import NewsSchema from "../components/NewsSchema";
import ContentHero from "../components/ContentHero";
import HeroSkeleton from "../components/skeletons/HeroSkeleton";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import { API_BASE } from "../services/http";
import DOMPurify from "dompurify";

export default function ContentDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const data = await fetchBySlug(slug);
        if (mounted) setItem(data);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

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
    sourceName,
    sourceUrl,
    imageSource,
    keywords,
    seoTitle,
    seoDescription,
    publishedAt,
    section,
    author,
    disclaimer,
  } = item;

  const imageUrl = image?.startsWith("http")
    ? image
    : image
    ? `${API_BASE}${image}`
    : null;

  const categorySlug = section
    ? section.toLowerCase().replace(/\s+/g, "-")
    : "news";

  const pageUrl = `https://www.trendbuzzs.com/trend/${slug}`;

  return (
    <>
      {/* SEO */}
      <SEO
        title={seoTitle || title}
        description={seoDescription || summary}
        keywords={keywords?.join?.(", ")}
        canonical={pageUrl}
        image={imageUrl}
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.trendbuzzs.com/" },
          {
            name: section || "News",
            url: `https://www.trendbuzzs.com/category/${categorySlug}`,
          },
          { name: title, url: pageUrl },
        ]}
      />

      <NewsSchema
        title={title}
        description={summary}
        image={imageUrl}
        slug={`trend/${slug}`}
        publishedAt={publishedAt}
        category={section}
      />

      <ContentHero
        title={title}
        summary={summary}
        image={imageUrl}
        sourceName={sourceName}
        publishedAt={publishedAt}
      />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-500">
          {publishedAt && (
            <span>
              🗓️{" "}
              {new Date(publishedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}

          {sourceName && <span>• 📰 {sourceName}</span>}

          {imageSource && (
            <span className="text-xs text-gray-400">• 📸 {imageSource}</span>
          )}

          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-orange-600 hover:underline text-xs"
            >
              View Source
            </a>
          )}
        </div>

        {/* Article */}
        {content ? (
          <article
            className="prose prose-lg max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        ) : (
          <div className="mt-8 text-gray-600">
            <p>{summary}</p>
            <p className="mt-4">
              We are updating this story with more details. Please check back
              soon.
            </p>
          </div>
        )}

        {disclaimer && (
          <div className="mt-10 p-4 border-l-4 border-orange-500 bg-orange-50 text-sm text-gray-700">
            ⚠️ {disclaimer}
          </div>
        )}
        {author && (
          <p className="mt-6 text-xs text-gray-500">
            Written by <strong>{author.name}</strong>
            {author.reviewedBy && <> · Reviewed by {author.reviewedBy}</>}
          </p>
        )}

        {keywords?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {keywords.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

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
