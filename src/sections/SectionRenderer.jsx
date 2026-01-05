import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchSection } from "../services/contentApi";
import ContentGrid from "./ContentGrid";
import TopStory from "./TopStory";
import VideoSection from "./VideoSection";
import AdSlot from "../components/AdSlot";

export default function SectionRenderer({ section }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetchSection(section)
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data)) setItems(data);
        else setItems([]);
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

  // ⛔ Don’t render anything until API resolved
  if (!loaded) return null;

  // ⛔ Don’t render empty sections (SEO + UX safe)
  if (!items || items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* 🔥 SPECIAL SECTIONS */}
      {section === "top" && <TopStory items={items} />}

      {section === "video" && <VideoSection items={items} />}

      {/* 🟢 NORMAL CONTENT GRID */}
      {section !== "top" && section !== "video" && (
        <>
          <ContentGrid title={section} items={items} />

          {/* 🔥 SAFE HOMEPAGE AD */}
          <AdSlot slot="1234567890" />
        </>
      )}
    </motion.section>
  );
}
