import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchSection } from "../services/contentApi";
import ContentGrid from "./ContentGrid";
import TopStory from "./TopStory";
import VideoSection from "./VideoSection";

export default function SectionRenderer({ section }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

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
  }, [section]);

  return (
    <section className="space-y-6 min-h-[400px]">
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
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {section === "top" && <TopStory items={items} />}
          {section === "video" && <VideoSection items={items} />}

          {section !== "top" && section !== "video" && (
            <ContentGrid title={section} items={items} />
          )}
        </motion.div>
      )}
    </section>
  );
}
