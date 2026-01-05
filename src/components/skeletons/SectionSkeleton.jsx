import CardSkeleton from "./CardSkeleton";

export default function SectionSkeleton({ title }) {
  return (
    <section>
      <div className="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse" />
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
