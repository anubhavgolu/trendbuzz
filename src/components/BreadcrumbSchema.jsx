import { Helmet } from "react-helmet-async";

export default function BreadcrumbSchema({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const safeItems = items.filter((i) => i?.name && i?.url);
  if (safeItems.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: safeItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
