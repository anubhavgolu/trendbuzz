import { Helmet } from "react-helmet-async";

export default function NewsSchema({
  title = "",
  description = "",
  image,
  slug,
  publishedAt,
  category = "General",
}) {
  const date =
    publishedAt && !isNaN(new Date(publishedAt))
      ? new Date(publishedAt)
      : new Date();

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `https://www.trendbuzzs.com/trend/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.trendbuzzs.com/trend/${slug}`,
    },
    headline: title,
    description,
    image: image ? [image] : undefined,
    datePublished: date.toISOString(),
    dateModified: date.toISOString(),
    author: {
      "@type": "Organization",
      name: "TrendBuzzs",
      url: "https://www.trendbuzzs.com",
    },
    publisher: {
      "@type": "Organization",
      name: "TrendBuzzs",
      logo: {
        "@type": "ImageObject",
        url: "https://www.trendbuzzs.com/logo.png",
      },
    },
    articleSection: category,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
