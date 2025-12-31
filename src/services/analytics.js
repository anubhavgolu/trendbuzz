export async function trackClick(page, x, y) {
  try {
    await fetch("http://localhost:5000/api/heatmap/track", {
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
  } catch {}
}
