import TrendCard from "./TrendCard";

export default function CategorySection({ title, category, trends }) {
  if (!Array.isArray(trends)) return null;

  const categoryTrends = trends
    .filter((t) => t.category === category)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 6);

  if (categoryTrends.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-5">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTrends.map((trend) => (
          <TrendCard key={trend.slug} {...trend} />
        ))}
      </div>
    </section>
  );
}
