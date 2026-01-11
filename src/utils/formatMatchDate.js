export const formatMatchDate = (dateStr) => {
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
