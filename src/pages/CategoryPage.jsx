import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import ContentGrid from "../sections/ContentGrid";
import { fetchSection } from "../services/contentApi";

export default function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchSection(category)
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
        else setItems([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  const title =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      {/* 🔍 SEO */}
      <SEO
        title={`${title} News & Trends – TrendBuzzs`}
        description={`Latest ${title} news, viral stories and trending updates curated by TrendBuzzs editors.`}
        canonical={`https://www.trendbuzzs.com/category/${category}`}
      />

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* H1 for SEO */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          {title}
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 mb-8 max-w-2xl">
          Latest curated {title.toLowerCase()} stories, updates and
          trending content.
        </p>

        {loading && (
          <p className="text-gray-500 text-sm">Loading…</p>
        )}

        {!loading && items.length === 0 && (
          <p className="text-gray-500 text-sm">
            No content available right now.
          </p>
        )}

        {items.length > 0 && (
          <ContentGrid title={title} items={items} />
        )}
      </main>
    </>
  );
}
