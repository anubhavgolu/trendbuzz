import MatchCardSkeleton from "./MatchCardSkeleton";

const ScheduleSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((day) => (
        <div key={day} className="wc-date-group">
          {/* Date header */}
          <div className="h-5 w-32 bg-gray-200 rounded mb-4 animate-pulse" />

          {[1, 2, 3].map((i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      ))}
    </>
  );
};

export default ScheduleSkeleton;
