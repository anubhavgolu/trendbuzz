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
  let finalUrl = canonical || siteUrl;
if (!canonical && typeof window !== "undefined") {
  finalUrl = siteUrl + window.location.pathname;
}

  const isArticle =
    finalUrl.includes("/article/") || finalUrl.includes("/trend/");

  const defaultImage = "https://www.trendbuzzs.com/assets/trendbuzz_logo.png";
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noIndex
            ? "noindex,nofollow"
            : "index,follow,max-image-preview:large"
        }
      />
      <link rel="canonical" href={finalUrl} />
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:site_name" content="TrendBuzzs" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
    </Helmet>
  );
}
