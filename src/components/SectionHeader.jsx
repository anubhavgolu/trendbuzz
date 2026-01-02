export default function SectionHeader({ title }) {
  if (!title) return null;

  // Capitalize first letter for display
  const displayTitle =
    title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-extrabold text-gray-900">
        {displayTitle}
      </h2>

      {/* optional future: View all */}
      {/* 
      <span className="text-sm text-orange-600 font-semibold cursor-pointer">
        View all →
      </span> 
      */}
    </div>
  );
}
