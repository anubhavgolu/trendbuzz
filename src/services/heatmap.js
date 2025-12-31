const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function trackClick(page, x, y) {
  try {
    await fetch(`${API_BASE}/api/heatmap/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        x,
        y,
        device: /mobile/i.test(navigator.userAgent)
          ? "mobile"
          : "desktop",
      }),
    });
  } catch {
    // silent
  }
}
