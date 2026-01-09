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
  const finalUrl = canonical || siteUrl;
  const isArticle = finalUrl.includes("/article");

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
      <link rel="canonical" href={finalUrl} />

      {/* OPEN GRAPH */}
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:title" content={title} />
      {description && (
        <meta property="og:description" content={description} />
      )}
      <meta property="og:url" content={finalUrl} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content="TrendBuzz" />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && (
        <meta name="twitter:description" content={description} />
      )}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
