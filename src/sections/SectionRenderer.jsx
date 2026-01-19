import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { fetchSection } from "../services/contentApi";
import ContentGrid from "./ContentGrid";
import TopStory from "./TopStory";
import VideoSection from "./VideoSection";

export default function SectionRenderer({ section }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(section === "top"); // ✅ top immediate

  const ref = useRef(null);

  const prettyTitle = useMemo(() => {
    return section
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }, [section]);

  // ✅ Trigger load when section comes into view
  useEffect(() => {
    if (shouldLoad) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" } // preload a bit before visible
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldLoad]);

  // ✅ Fetch only when shouldLoad true
  useEffect(() => {
    if (!shouldLoad) return;

    let mounted = true;
    setLoaded(false);

    fetchSection(section)
      .then((data) => {
        if (!mounted) return;
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setItems([]);
      })
      .finally(() => {
        if (mounted) setLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, [section, shouldLoad]);

  return (
    <section ref={ref} className="space-y-6 min-h-[240px]">
      {!loaded && (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-48 bg-gray-200 rounded" />
            <div className="h-48 bg-gray-200 rounded" />
            <div className="h-48 bg-gray-200 rounded" />
          </div>
        </div>
      )}

      {loaded && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {section === "top" && <TopStory items={items} />}
          {section === "video" && <VideoSection items={items} />}

          {section !== "top" && section !== "video" && (
            <ContentGrid title={prettyTitle} items={items} />
          )}
        </motion.div>
      )}

      {loaded && items.length === 0 && (
        <p className="text-sm text-gray-500">
          No {prettyTitle.toLowerCase()} stories available right now.
        </p>
      )}
    </section>
  );
}
