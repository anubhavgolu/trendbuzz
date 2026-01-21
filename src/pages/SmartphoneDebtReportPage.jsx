import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import SmartphoneDebtReport from "../components/reports/SmartphoneDebtReport";

export default function SmartphoneDebtReportPage() {
  const canonical = "https://www.trendbuzzs.com/reports/smartphone-debt";

  const pageTitle =
    "India Smartphone Debt Report 2026 (Estimated) | Statewise & Citywise | TrendBuzzs";

  const pageDescription =
    "Model-based estimate of smartphone EMI/BNPL debt in India with statewise and citywise breakdown, charts, assumptions and sources. For informational purposes only.";

  const publishedDate = "2026-01-21";
  const modifiedDate = "2026-01-21";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "India Smartphone Debt Report 2026 (Estimated)",
    description: pageDescription,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Organization",
      name: "TrendBuzzs Desk",
    },
    publisher: {
      "@type": "Organization",
      name: "TrendBuzzs",
      logo: {
        "@type": "ImageObject",
        url: "https://www.trendbuzzs.com/assets/trendbuzz_logo.png",
      },
    },
    image: [
      "https://res.cloudinary.com/dxr4nmrui/image/upload/v1768992640/Report_On_India_Smartphone_Debt_Report_qpwhpi.webp",
    ],
    articleSection: "Reports",
    keywords: [
      "smartphone debt india",
      "emi bnpl india",
      "statewise debt",
      "citywise debt",
      "smartphone financing",
      "trendbuzzs report",
    ],
    isAccessibleForFree: true,
  };

  // JSON-LD: Breadcrumb (Google loves this)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.trendbuzzs.com",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "India Smartphone Debt Report 2026 (Estimated)",
        item: canonical,
      },
    ],
  };

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} canonical={canonical} />

      <Helmet>
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonical} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dxr4nmrui/image/upload/v1768992640/Report_On_India_Smartphone_Debt_Report_qpwhpi.webp"
        />
        <meta property="og:site_name" content="TrendBuzzs" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <header className="max-w-3xl space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            India Smartphone Debt Report 2026{" "}
            <span className="text-gray-500 text-base font-semibold">
              (Estimated)
            </span>
          </h1>

          <p className="text-gray-600">
            Statewise + citywise breakdown with charts, tables, assumptions and
            sources. This is a model-based estimate for informational purposes
            only.
          </p>
        </header>

        <SmartphoneDebtReport />
      </main>
    </>
  );
}
