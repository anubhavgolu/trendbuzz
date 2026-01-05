import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  noIndex = false,
  image,
}) {
  const siteUrl = "https://www.trendbuzzs.com";

  return (
    <Helmet>
      {/* BASIC */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {/* ROBOTS */}
      <meta
        name="robots"
        content={noIndex ? "noindex,nofollow" : "index,follow"}
      />
      {/* CANONICAL */}
      <link rel="canonical" href={canonical || siteUrl} />
      {/* OPEN GRAPH */}
      - <meta property="og:type" content="article" />
      <meta
        property="og:type"
        content={canonical?.includes("/trend/") ? "article" : "website"}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical || siteUrl} />
      {image && <meta property="og:image" content={image} />}
      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
