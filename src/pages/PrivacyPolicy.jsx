import SEO from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | TrendBuzzs"
        description="Privacy policy explaining how TrendBuzzs collects, uses, and protects user information."
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-700 leading-relaxed">
          At TrendBuzzs, we value the privacy of our visitors. This Privacy
          Policy document explains what types of information are collected and
          recorded by TrendBuzzs and how we use it.
        </p>

        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Information We Collect
        </h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          TrendBuzzs does not collect personal information such as names,
          addresses, phone numbers, or email addresses directly from users.
          However, we may collect non-personal information such as browser type,
          device information, pages visited, and time spent on the site for
          analytics and performance improvement purposes.
        </p>

        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Cookies and Web Beacons
        </h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          TrendBuzzs uses cookies to store information about visitors’
          preferences and to optimize the user experience by customizing our web
          page content based on visitors’ browser type or other information.
        </p>

        <h2 className="mt-6 text-xl font-bold text-gray-900">Google AdSense</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          Google is a third-party vendor on TrendBuzzs. It uses cookies, such as
          the DoubleClick cookie, to serve ads to users based on their visit to
          TrendBuzzs and other websites on the internet.
        </p>

        <p className="mt-2 text-gray-700 leading-relaxed">
          Users may opt out of the use of the DoubleClick cookie for
          interest-based advertising by visiting Google Ad Settings.
        </p>
        <p className="mt-4 text-gray-700">
          TrendBuzzs complies with Google AdSense program policies and uses
          advertising cookies only where permitted.
        </p>

        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Third-Party Privacy Policies
        </h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          TrendBuzzs’s Privacy Policy does not apply to other advertisers or
          websites. We advise you to consult the respective Privacy Policies of
          third-party ad servers or websites for more detailed information about
          their practices and instructions on how to opt out of certain options.
        </p>

        <h2 className="mt-6 text-xl font-bold text-gray-900">Consent</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>
      </div>
    </>
  );
}
