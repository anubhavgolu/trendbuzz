import SEO from "../components/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="About TrendBuzzs | Why Topics Are Trending"
        description="Learn about TrendBuzzs and how we explain why topics trend on social media."
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          About TrendBuzzs
        </h1>

        <p className="mt-4 text-gray-700 leading-relaxed">
          TrendBuzzs is a platform that explains why topics are trending on
          social media platforms like Twitter and Reddit in simple words.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Our goal is to help users understand the reasons behind viral trends,
          breaking news, and online discussions without noise or misinformation.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          We analyze public data, discussions, and signals to present trends in
          an easy-to-read editorial format.
        </p>
      </div>
    </>
  );
}
