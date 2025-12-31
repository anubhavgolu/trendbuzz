import SEO from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | TrendBuzz"
        description="Privacy policy explaining how TrendBuzz handles user data."
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-700">
          At TrendBuzz, we respect your privacy. This Privacy Policy explains
          how we collect, use, and protect information.
        </p>

        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Information We Collect
        </h2>
        <p className="mt-2 text-gray-700">
          We do not collect personal information such as name, email, or phone
          number. We may collect anonymous usage data for analytics purposes.
        </p>

        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Cookies
        </h2>
        <p className="mt-2 text-gray-700">
          TrendBuzz may use cookies provided by third-party services such as
          Google AdSense to display relevant advertisements.
        </p>

        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Third-Party Services
        </h2>
        <p className="mt-2 text-gray-700">
          Third-party vendors, including Google, use cookies to serve ads based
          on a user's prior visits to this website or other websites.
        </p>

        <p className="mt-4 text-gray-700">
          Users may opt out of personalized advertising by visiting Google Ad
          Settings.
        </p>
      </div>
    </>
  );
}
