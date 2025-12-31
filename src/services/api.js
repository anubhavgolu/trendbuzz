import { API_BASE } from "./http";

/* ================= TRENDS ================= */
export async function fetchTrends(filter) {
  const url = filter
    ? `${API_BASE}/api/trends?filter=${filter}`
    : `${API_BASE}/api/trends`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data || !Array.isArray(data.trends)) {
    console.warn("Trends not ready yet", data);
    return [];
  }

  return data.trends;
}

/* ================= COMMENTS ================= */
export async function fetchComments(slug) {
  const res = await fetch(
    `${API_BASE}/api/comments/${slug}`
  );

  if (!res.ok) return [];
  return res.json();
}
