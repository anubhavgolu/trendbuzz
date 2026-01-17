import SEO from "../components/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="About TrendBuzzs | Trending News Explained Simply"
        description="Learn about TrendBuzzs, an independent platform that explains trending and breaking news in clear, factual, and easy-to-understand language."
      />

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          About TrendBuzzs
        </h1>

        <h2 className="text-xl font-semibold text-gray-800">
          What Is TrendBuzzs?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          TrendBuzzs is an independent digital news platform focused on
          explaining trending and breaking news in simple, clear, and factual
          language.
        </p>

        <h2 className="text-xl font-semibold text-gray-800">
          Our Editorial Approach
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Our goal is to help readers quickly understand why a particular topic
          is trending, what happened, and why it matters — without clickbait,
          misinformation, or unnecessary noise.
        </p>

        <h2 className="text-xl font-semibold text-gray-800">Topics We Cover</h2>
        <p className="text-gray-700 leading-relaxed">
          We cover a wide range of trending topics including current affairs,
          technology, entertainment, sports, and internet culture. All content
          is written to be easy to read, informative, and relevant to what
          people are searching for right now.
        </p>

        <h2 className="text-xl font-semibold text-gray-800">
          Why You Can Trust TrendBuzzs
        </h2>
        <p className="text-gray-700 leading-relaxed">
          TrendBuzzs prioritizes accuracy, transparency, and reader trust. Our
          content is based on verified information from reliable public sources,
          official announcements, and widely discussed online trends. We aim to
          update or correct information whenever new facts become available.
        </p>

        <h2 className="text-xl font-semibold text-gray-800">Looking Ahead</h2>
        <p className="text-gray-700 leading-relaxed">
          In the future, TrendBuzzs may introduce helpful tools and features to
          make it easier for users to explore trends, discover insights, and
          stay updated with what’s happening online.
        </p>
        <p className="text-gray-700 leading-relaxed">
          TrendBuzzs is managed by an independent editorial team focused on
          explaining trending news responsibly and transparently for a global
          audience.
        </p>
      </main>
    </>
  );
}
