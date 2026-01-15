import { useState, useEffect } from "react";
import GradientWrapper from "../../components/InstagramComponent/GradientWrapper";
import SingleAnalyzer from "../../components/InstagramComponent/SingleAnalyzer";
import InstagramCompare from "./InstagramCompare";
import { Helmet } from "react-helmet-async";

export default function InstagramAnalyzer() {
  const [tab, setTab] = useState("single");
  const params = new URLSearchParams(location.search);
  const tabFromUrl = params.get("tab");
  useEffect(() => {
    if (tabFromUrl === "compare") setTab("compare");
  }, [tabFromUrl]);
  return (
    <>
      <Helmet>
        <title>
          Instagram Profile Analyzer & Compare Tool (Free) | TrendBuzz
        </title>

        <meta
          name="description"
          content="Analyze Instagram profiles instantly. Check followers, engagement rate, content type, and compare two Instagram accounts for free."
        />

        <meta
          name="keywords"
          content="Instagram analyzer, Instagram profile analyzer, Instagram compare tool, Instagram engagement calculator"
        />

        <link
          rel="canonical"
          href="https://trendbuzzs.com/instagram-analyzer"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Instagram Profile Analyzer & Compare Tool | TrendBuzz"
        />
        <meta
          property="og:description"
          content="Analyze Instagram profiles and compare followers, engagement, and content performance instantly."
        />
        <meta
          property="og:url"
          content="https://trendbuzzs.com/instagram-analyzer"
        />
        <meta property="og:site_name" content="TrendBuzz" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Instagram Profile Analyzer & Compare Tool"
        />
        <meta
          name="twitter:description"
          content="Check Instagram followers, engagement rate, and compare profiles instantly."
        />
        <meta name="author" content="TrendBuzz Editorial Team" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Instagram Profile Analyzer",
        "operatingSystem": "Web",
        "applicationCategory": "SocialMediaApplication",
        "publisher": {
          "@type": "Organization",
          "name": "TrendBuzz",
          "url": "https://trendbuzzs.com"
        }
      }
      `,
          }}
        />
      </Helmet>

      <GradientWrapper>
        <section className="mt-16 text-sm text-gray-600 max-w-3xl mx-auto px-6 text-center sm:text-left">
          <h2 className="font-semibold text-gray-800 mb-2 text-base">
            About this Instagram Analyzer
          </h2>
          <p className="leading-relaxed">
            This Instagram Analyzer tool helps users understand public Instagram
            profile statistics such as followers, engagement rate, and content
            type. All data is analyzed from publicly available information.
          </p>
        </section>
        <div className="py-12">
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="flex justify-center mb-10">
              <div className="flex gap-8 border-b border-gray-200">
                <button
                  onClick={() => setTab("single")}
                  className={`relative pb-3 text-sm sm:text-base font-semibold transition ${
                    tab === "single"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Single Profile
                  {tab === "single" && (
                    <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-orange-500 rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setTab("compare")}
                  className={`relative pb-3 text-sm sm:text-base font-semibold transition ${
                    tab === "compare"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Compare Profiles
                  {tab === "compare" && (
                    <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-orange-500 rounded-full" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4">
              {tab === "single" && <SingleAnalyzer />}
              {tab === "compare" && <InstagramCompare />}
            </div>
          </div>
        </div>
      </GradientWrapper>
    </>
  );
}
