import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBySlug } from "../services/contentApi";
import SEO from "../components/SEO";
import NewsSchema from "../components/NewsSchema";
import HeroSkeleton from "../components/skeletons/HeroSkeleton";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import { API_BASE } from "../services/http";
import DOMPurify from "dompurify";
import { fetchSection } from "../services/contentApi";
import ContentCard from "../components/ContentCard";

export default function ContentDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const data = await fetchBySlug(slug);

        if (!mounted) return;

        setItem(data);
        const sec = data?.section || null;

        if (sec) {
          const rel = await fetchSection(sec);

          if (mounted && Array.isArray(rel)) {
            const filtered = rel
              .filter((x) => x?.slug && x.slug !== slug)
              .slice(0, 4);

            setRelated(filtered);
          } else {
            setRelated([]);
          }
        } else {
          setRelated([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [slug]);

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      try {
        const res = await fetch(`${API_BASE}/api/content/sections`);
        const data = await res.json();

        if (!mounted) return;

        const names = Array.isArray(data)
          ? data
              .map((s) => (typeof s === "string" ? s : s?.name))
              .filter(Boolean)
          : [];
        const formatted = names.map((name) => ({
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
        }));

        setAllCategories(formatted);
      } catch (e) {
        console.error("Categories load failed", e);
        setAllCategories([]);
      }
    }

    loadCategories();
    return () => (mounted = false);
  }, []);

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

  const otherCategories = allCategories
    .filter((c) => c.slug !== categorySlug)
    .slice(0, 6);

  const pageUrl = `https://www.trendbuzzs.com/trend/${slug}`;

  function removeFirstH1(html) {
    if (!html) return html;
    return html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "");
  }

  function removeFirstParagraphIfDuplicate(html, summary) {
    if (!html) return html;

    const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (!match) return html;

    const firstPText = match[1]
      .replace(/<[^>]+>/g, "") // remove html tags inside p
      .replace(/\s+/g, " ")
      .trim();

    const summaryText = (summary || "").replace(/\s+/g, " ").trim();

    // ✅ only remove if very similar
    if (
      summaryText &&
      firstPText &&
      firstPText.startsWith(summaryText.slice(0, 60))
    ) {
      return html.replace(/<p[^>]*>[\s\S]*?<\/p>/i, "");
    }

    return html;
  }

  const cleanedContent = content
    ? removeFirstParagraphIfDuplicate(removeFirstH1(content), summary)
    : "";

  return (
    <>
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

      <header className="max-w-5xl mx-auto px-4 pt-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
          {section && (
            <Link
              to={`/category/${categorySlug}`}
              className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              {section}
            </Link>
          )}

          {publishedAt && (
            <span>
              {new Date(publishedAt).toLocaleString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}

          {sourceName && <span>• {sourceName}</span>}
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {title}
        </h1>

        <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
          {imageUrl ? (
            <div className="rounded-2xl overflow-hidden bg-gray-100 border">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 border">
                <img
                  src={imageUrl}
                  alt={title}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {(imageSource || sourceUrl) && (
                <div className="px-3 py-2 text-[11px] text-gray-500 bg-white border-t flex items-center justify-between gap-3">
                  <span className="truncate">
                    {imageSource ? `📸 ${imageSource}` : ""}
                  </span>

                  {sourceUrl && (
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-orange-600 hover:underline whitespace-nowrap"
                    >
                      View Source →
                    </a>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl bg-gray-50 border p-6 text-sm text-gray-500">
              No image available.
            </div>
          )}
          <div className="text-gray-700">
            <p className="text-base md:text-lg leading-relaxed">{summary}</p>

            <div className="mt-4">
              <Link
                to={`/category/${categorySlug}`}
                className="text-sm font-semibold text-orange-600 hover:underline"
              >
                More from {section || "this category"} →
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-10">
        {content ? (
          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(cleanedContent),
            }}
          />
        ) : (
          <div className="text-gray-600">
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

        {author?.name && (
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

        {related.length > 0 && (
          <section className="mt-12 border-t pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                Related stories
              </h3>

              <Link
                to={`/category/${categorySlug}`}
                className="text-sm font-semibold text-orange-600 hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((post) => (
                <ContentCard key={post.slug} {...post} />
              ))}
            </div>
          </section>
        )}

        {otherCategories.length > 0 && (
          <div className="mt-10 border-t pt-6">
            <h3 className="text-sm font-bold text-gray-900">
              You can also check:
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              {otherCategories.map((cat, idx) => (
                <span key={cat.slug} className="flex items-center gap-2">
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-orange-600 hover:underline"
                  >
                    {cat.name}
                  </Link>

                  {idx !== otherCategories.length - 1 && (
                    <span className="text-gray-400">|</span>
                  )}
                </span>
              ))}

              <span className="text-gray-400">|</span>

              <Link
                to="/categories"
                className="text-orange-600 hover:underline"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        )}

        {/* Back */}
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
