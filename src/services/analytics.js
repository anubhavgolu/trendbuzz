import { API_BASE } from "./http";

export async function trackPage(page, slug = null) {
  try {
    await fetch(`${API_BASE}/api/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page, slug }),
    });
  } catch {
    // silent fail (analytics should never break UX)
  }
}
