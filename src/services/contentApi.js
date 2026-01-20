import { API_BASE } from "./http";

const sectionCache = {};
const slugCache = {};
const sectionPending = {}; // ✅ new
const slugPending = {};    // ✅ new

export async function fetchSection(section, { force = false } = {}) {
  if (!section) return [];

  if (!force && sectionCache[section]) return sectionCache[section];

  // ✅ if already fetching, return same promise
  if (!force && sectionPending[section]) return sectionPending[section];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  sectionPending[section] = fetch(`${API_BASE}/api/content/section/${section}`, {
    signal: controller.signal,
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to fetch section: " + section);
      return res.json();
    })
    .then((data) => {
      sectionCache[section] = data;
      return data;
    })
    .finally(() => {
      clearTimeout(timer);
      delete sectionPending[section];
    });

  return sectionPending[section];
}

export async function fetchBySlug(slug, { force = false } = {}) {
  if (!slug) return null;

  if (!force && slugCache[slug]) return slugCache[slug];

  // ✅ if already fetching, return same promise
  if (!force && slugPending[slug]) return slugPending[slug];

  slugPending[slug] = fetch(`${API_BASE}/api/content/${slug}`)
    .then(async (res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .then((data) => {
      if (data) slugCache[slug] = data;
      return data;
    })
    .finally(() => {
      delete slugPending[slug];
    });

  return slugPending[slug];
}

export function clearContentCache() {
  Object.keys(sectionCache).forEach((k) => delete sectionCache[k]);
  Object.keys(slugCache).forEach((k) => delete slugCache[k]);
  Object.keys(sectionPending).forEach((k) => delete sectionPending[k]);
  Object.keys(slugPending).forEach((k) => delete slugPending[k]);
}
