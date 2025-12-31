export async function fetchTrends(filter) {
  const url = filter
    ? `/api/trends?filter=${filter}`
    : `/api/trends`;

  const res = await fetch(url);
  const data = await res.json();

  // 🛡 SAFETY
  if (!data || !Array.isArray(data.trends)) {
    console.warn("Trends not ready yet", data);
    return [];
  }

  return data.trends;
}

export async function fetchComments(slug) {
  const res = await fetch(
    `http://localhost:5000/api/comments/${slug}`
  );
  return res.json();
}
export async function deleteManualNews() {
  const res = await fetch(`${API_BASE}/api/manual-news/delete`, {
    method: "DELETE",
    headers: {
      "x-admin-key": ADMIN_KEY,
    },
  });
  return res.json();
}
