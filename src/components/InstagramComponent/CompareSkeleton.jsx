export default function CompareSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 space-y-4"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto" />
          <div className="h-4 bg-gray-200 w-1/2 mx-auto" />
          <div className="flex justify-around">
            <div className="h-4 w-10 bg-gray-200" />
            <div className="h-4 w-10 bg-gray-200" />
            <div className="h-4 w-10 bg-gray-200" />
          </div>
          <div className="h-3 bg-gray-200 w-3/4 mx-auto" />
        </div>
      ))}
    </div>
  );
}
