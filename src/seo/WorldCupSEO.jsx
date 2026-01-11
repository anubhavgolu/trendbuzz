import { Helmet } from "react-helmet-async";

const WorldCupSEO = ({
  title,
  description,
  url,
  pageType = "Schedule",
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": `ICC Men’s T20 World Cup 2026 – ${pageType}`,
    "startDate": "2026-02-07",
    "endDate": "2026-03-08",
    "eventStatus": "https://schema.org/EventScheduled",
    "sport": "Cricket",
    "location": {
      "@type": "Place",
      "name": "India & Sri Lanka",
    },
    "organizer": {
      "@type": "Organization",
      "name": "International Cricket Council",
      "url": "https://www.icc-cricket.com",
    },
    "url": url,
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


      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />


      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default WorldCupSEO;
