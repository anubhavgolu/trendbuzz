const MatchCardSkeleton = () => {
  return (
    <div className="wc-card animate-pulse">
      {/* header */}
      <div className="wc-header">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>

      {/* teams */}
      <div className="wc-row">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        <div className="h-4 w-8 bg-gray-200 rounded" />

        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* footer */}
      <div className="wc-footer">
        <div className="h-3 w-40 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default MatchCardSkeleton;
