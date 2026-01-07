import SEO from "../components/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="About TrendBuzzs | Trending News Explained Simply"
        description="Learn about TrendBuzzs, a platform that explains trending and breaking news in simple, easy-to-understand language."
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          About TrendBuzzs
        </h1>

        <p className="mt-4 text-gray-700 leading-relaxed">
          TrendBuzzs is an independent digital news platform focused on
          explaining trending and breaking news in simple, clear, and factual
          language.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Our goal is to help readers quickly understand why a particular topic
          is trending, what happened, and why it matters — without clickbait,
          misinformation, or unnecessary noise.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          We cover a wide range of trending topics including current affairs,
          technology, entertainment, sports, and internet culture. All content
          is written to be easy to read, informative, and relevant to what
          people are searching for right now.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          In the future, TrendBuzzs may introduce helpful tools and features to
          make it easier for users to explore trends, discover insights, and
          stay updated with what’s happening online.
        </p>
      </div>
    </>
  );
}
