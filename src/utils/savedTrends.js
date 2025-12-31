const KEY = "trendbuzz_saved";

export function getSavedTrends() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function toggleSave(trend) {
  const saved = getSavedTrends();
  const exists = saved.find((t) => t.slug === trend.slug);

  const updated = exists
    ? saved.filter((t) => t.slug !== trend.slug)
    : [...saved, trend];

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function isSaved(slug) {
  return getSavedTrends().some((t) => t.slug === slug);
}
