import SEO from "../components/SEO";
import SectionRenderer from "../sections/SectionRenderer";

export default function Categories() {
  return (
    <>
      <SEO
        title="TrendBuzzs – Today’s Top Stories"
        description="Editor-curated top stories, tech, entertainment, videos and social trends."
        canonical="https://www.trendbuzzs.com/"
        image="https://www.trendbuzzs.com/og-home.png"
      />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        {/* H1 for SEO */}
        <h1 className="sr-only">
          Today’s Top Stories – TrendBuzzs
        </h1>

        {/* CURATED SECTIONS */}
        <SectionRenderer section="top" />
        <SectionRenderer section="tech" />
        <SectionRenderer section="news" />
        <SectionRenderer section="entertainment" />
        <SectionRenderer section="video" />
        <SectionRenderer section="social" />
      </main>
    </>
  );
}
