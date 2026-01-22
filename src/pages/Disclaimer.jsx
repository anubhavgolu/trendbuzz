import SEO from "../components/SEO";

export default function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer | TrendBuzzs"
        description="Disclaimer regarding content accuracy, external links, and informational use of content on TrendBuzzs."
        canonical="https://www.trendbuzzs.com/disclaimer"
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Disclaimer</h1>

        <p className="mt-4 text-gray-700 leading-relaxed">
          All information published on TrendBuzzs is provided in good faith and
          for general informational purposes only. While we aim to present
          accurate and up-to-date information, TrendBuzzs makes no warranties
          regarding the completeness, reliability, or accuracy of any content.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          The content published on TrendBuzzs should not be considered as
          professional, legal, financial, or medical advice. Any action you take
          upon the information on this website is strictly at your own
          discretion and risk.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          TrendBuzzs may include links to external websites for reference or
          additional information. While we strive to link to reliable sources,
          we have no control over the content, nature, or availability of those
          external sites and do not endorse any views expressed on them.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          By using TrendBuzzs, you acknowledge that you understand and agree to
          this disclaimer.
        </p>
      </div>
    </>
  );
}
