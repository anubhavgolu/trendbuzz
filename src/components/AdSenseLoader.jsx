import { useEffect } from "react";

export default function AdSenseLoader({
  client = "ca-pub-1788108525667414",
  delay = 2000,
}) {
  useEffect(() => {
    const already = document.querySelector(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
    );
    if (already) return;

    const timer = setTimeout(() => {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    }, delay);

    return () => clearTimeout(timer);
  }, [client, delay]);

  return null;
}
