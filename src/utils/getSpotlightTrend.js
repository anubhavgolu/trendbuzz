export function getSpotlightTrend(trends) {
  if (!Array.isArray(trends) || trends.length === 0) return null;

  // 1️⃣ Image wale posts lo
  const withImage = trends.filter((t) => t.image);

  // 2️⃣ Priority categories
  const priority = withImage.filter((t) =>
    ["news", "tech", "entertainment"].includes(t.category)
  );

  // 3️⃣ Sort by popularity
  const sorted = priority.sort(
    (a, b) => b.popularityScore - a.popularityScore
  );

  // 4️⃣ Fallbacks
  return (
    sorted[0] ||
    withImage.sort((a, b) => b.popularityScore - a.popularityScore)[0] ||
    trends[0]
  );
}
