import { Helmet } from "react-helmet-async";

const COVER_IMAGE =
  "https://www.trendbuzzs.com/assets/worldcup-2026-cover.jpeg";

const WorldCupSEO = ({ title, description, url, pageType }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": COVER_IMAGE
    },
    "about": {
      "@type": "SportsEvent",
      "name": "ICC Men’s T20 World Cup 2026",
      "startDate": "2026-02-07",
      "endDate": "2026-03-08",
      "sport": "Cricket",
      "organizer": {
        "@type": "Organization",
        "name": "International Cricket Council",
        "url": "https://www.icc-cricket.com"
      }
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="TrendBuzzs" />
      <meta property="og:image" content={COVER_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default WorldCupSEO;
