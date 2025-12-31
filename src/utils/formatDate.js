export function formatDate(timestamp) {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
