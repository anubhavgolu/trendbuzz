export function formatImageUrl(url, width = 600) {
  if (!url || typeof url !== "string") return "";

  try {
    const imageUrl = new URL(url);
    const host = imageUrl.hostname;

    // 🚫 iStock → NEVER touch
    if (host.includes("istockphoto.com")) {
      return url;
    }

    // ✅ Unsplash / CDN only
    if (
      host.includes("unsplash.com") ||
      host.includes("cloudinary.com") ||
      host.includes("imgix.net")
    ) {
      imageUrl.searchParams.set("w", width);
      imageUrl.searchParams.set("auto", "format");
      imageUrl.searchParams.set("fit", "crop");
      return imageUrl.toString();
    }

    // ✅ Pixabay / normal
    return url;
  } catch {
    return url;
  }
}
