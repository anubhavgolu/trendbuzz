import SEO from "../components/SEO";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact TrendBuzzs | Get in Touch"
        description="Contact TrendBuzzs for feedback, business inquiries, or copyright-related concerns."
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Contact TrendBuzzs
        </h1>

        <p className="mt-4 text-gray-700 leading-relaxed">
          If you have any questions, feedback, business inquiries, or
          copyright-related concerns, feel free to reach out to us.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          You can contact us directly at:
        </p>

        <p className="mt-2 text-lg font-semibold text-gray-900">
          📧{" "}
          <a
            href="mailto:contact@trendbuzzs.com"
            className="text-blue-600 underline"
          >
            contact@trendbuzzs.com
          </a>
        </p>
        <p className="mt-4 text-gray-700">
          For urgent matters, please mention the subject clearly in your email.
        </p>

        <p className="mt-6 text-gray-700 leading-relaxed">
          We aim to respond to all genuine queries as quickly as possible.
        </p>
      </div>
    </>
  );
}
