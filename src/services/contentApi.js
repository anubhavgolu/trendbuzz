import { API_BASE } from "./http";

const sectionCache = {};
const slugCache = {};

export async function fetchSection(section, { force = false } = {}) {
  if (!force && sectionCache[section]) return sectionCache[section];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${API_BASE}/api/content/section/${section}`, {
      signal: controller.signal,
    });

    if (!res.ok) throw new Error("Failed to fetch section: " + section);

    const data = await res.json();
    sectionCache[section] = data;
    return data;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchBySlug(slug, { force = false } = {}) {
  if (!slug) return null;

  if (!force && slugCache[slug]) {
    return slugCache[slug];
  }

  const res = await fetch(`${API_BASE}/api/content/${slug}`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  slugCache[slug] = data;

  return data;
}

export function clearContentCache() {
  Object.keys(sectionCache).forEach((k) => delete sectionCache[k]);
  Object.keys(slugCache).forEach((k) => delete slugCache[k]);
}
