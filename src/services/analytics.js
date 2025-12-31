export async function trackPage(page, slug = null) {
  try {
    await fetch("http://localhost:5000/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, slug }),
    });
  } catch {
    // silent fail
  }
}
