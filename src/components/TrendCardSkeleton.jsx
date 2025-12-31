export default function TrendCardSkeleton() {
  return (
    <div className="bg-white border rounded-xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-44 bg-gray-200" />

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded mt-4" />
      </div>
    </div>
  );
}
