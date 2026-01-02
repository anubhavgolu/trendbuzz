import { useEffect, useState } from "react";
import { fetchSection } from "../services/contentApi";
import ContentGrid from "./ContentGrid";
import TopStory from "./TopStory";
import VideoSection from "./VideoSection";

export default function SectionRenderer({ section }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchSection(section).then(setItems);
  }, [section]);

  if (!items.length) return null;

  if (section === "top") {
    return <TopStory items={items} />;
  }

  if (section === "video") {
    return <VideoSection items={items} />;
  }
  if (!items.length) return null;


  return <ContentGrid title={section} items={items} />;
}
