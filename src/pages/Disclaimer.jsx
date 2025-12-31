import SEO from "../components/SEO";

export default function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer | TrendBuzz"
        description="Disclaimer regarding content accuracy and external links."
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Disclaimer
        </h1>

        <p className="mt-4 text-gray-700 leading-relaxed">
          The information provided on TrendBuzz is for informational purposes
          only. While we strive for accuracy, we do not guarantee completeness
          or reliability of the information.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          TrendBuzz does not provide financial, legal, or professional advice.
          Any action you take based on the information found on this website is
          strictly at your own risk.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          External links may be provided for reference. We have no control over
          the content or nature of those sites.
        </p>
      </div>
    </>
  );
}
