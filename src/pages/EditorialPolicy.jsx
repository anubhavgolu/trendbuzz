import SEO from "../components/SEO";

export default function EditorialPolicy() {
  return (
    <>
      <SEO
        title="Editorial Policy | TrendBuzzs"
        description="Editorial policy outlining how TrendBuzzs publishes and explains trending topics."
        canonical="https://www.trendbuzzs.com/editorial-policy"
      />

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Editorial Policy
        </h1>

        <p className="text-gray-700 leading-relaxed">
          TrendBuzzs is an informational platform focused on explaining trending
          topics and widely discussed news stories. Our content is intended to
          help readers understand why a topic is trending and what information
          is publicly available at the time of publication.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Content Approach</h2>
        <p className="text-gray-700 leading-relaxed">
          Articles published on TrendBuzzs are based on publicly available
          information from reliable sources, official announcements, and widely
          discussed online platforms. We aim to summarize and explain trending
          topics in a clear and neutral manner.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Accuracy & Updates</h2>
        <p className="text-gray-700 leading-relaxed">
          While we strive to present accurate information, TrendBuzzs does not
          claim to provide exhaustive or original reporting. Information may
          evolve over time, and content may be updated when significant new
          details become available.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Corrections</h2>
        <p className="text-gray-700 leading-relaxed">
          If an error is identified, we make reasonable efforts to correct or
          clarify the content. Updates may be reflected within the article
          without formal correction notices.
        </p>

        <h2 className="text-xl font-bold text-gray-900">
          Editorial Independence
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Editorial content on TrendBuzzs is not influenced by advertisers or
          sponsors. Advertising does not determine how topics are selected or
          presented.
        </p>

        <p className="text-sm text-gray-500">Last updated: January 2026</p>
      </main>
    </>
  );
}
