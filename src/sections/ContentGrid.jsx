import ContentCard from "../components/ContentCard";
import SectionHeader from "../components/SectionHeader";

export default function ContentGrid({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <section>
      {title && <SectionHeader title={title} />}

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {items.map((item) => (
          <ContentCard key={item.slug} {...item} />
        ))}
      </div>
    </section>
  );
}
