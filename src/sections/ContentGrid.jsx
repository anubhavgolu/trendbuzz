import ContentCard from "../components/ContentCard";
import SectionHeader from "../components/SectionHeader";

export default function ContentGrid({ title, items = [], showViewAll = true }) {
  if (!items || items.length === 0) return null;

  return (
    <section aria-label={title || "Content Grid"}>
      {title && <SectionHeader title={title} showViewAll={showViewAll} />}

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {items.map((item, idx) => (
          <ContentCard key={item.slug || item._id || idx} {...item} />
        ))}
      </div>
    </section>
  );
}