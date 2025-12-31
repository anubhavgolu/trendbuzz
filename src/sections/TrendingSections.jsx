import { Link } from "react-router-dom";

const sections = [
  { title: "Tech Trends", emoji: "💻", slug: "tech" },
  { title: "Entertainment", emoji: "🎬", slug: "entertainment" },
  { title: "News", emoji: "📰", slug: "news" },
  { title: "Memes", emoji: "😂", slug: "memes" },
];

export default function TrendingSections() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        📊 Trending Sections
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {sections.map((item) => (
          <Link
            to={`/category/${item.slug}`}
            key={item.slug}
            className="bg-white border rounded-xl p-5 hover:shadow-md transition block"
          >
            <h3 className="text-lg font-bold text-gray-900">
              {item.emoji} {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Explore trending topics in this category.
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
