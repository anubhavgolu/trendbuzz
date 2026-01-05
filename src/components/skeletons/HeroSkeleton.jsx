export default function HeroSkeleton() {
  return (
    <section className="space-y-6 animate-pulse">
      <div className="h-[360px] bg-gray-200 rounded-2xl" />
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </section>
  );
}
