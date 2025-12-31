import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export default function TopDiscussions({ trends }) {
  if (!Array.isArray(trends) || trends.length === 0) return null;

  const topDiscussions = [...trends]
    .filter((t) => typeof t.comments === "number")
    .sort((a, b) => {
      if (b.comments !== a.comments) {
        return b.comments - a.comments;
      }
      return b.popularityScore - a.popularityScore;
    })
    .slice(0, 6);

  if (topDiscussions.length === 0) {
    return (
      <aside className="bg-white border rounded-xl p-5">
        <h3 className="text-lg font-bold mb-2">💬 Top Discussions</h3>
        <p className="text-sm text-gray-500">
          Discussions are warming up…
        </p>
      </aside>
    );
  }

  return (
    <aside className="bg-white border rounded-xl p-5 sticky top-24">
      <h3 className="text-lg font-extrabold text-gray-900 mb-4">
        💬 Top Discussions
      </h3>

      <ul className="space-y-4">
        {topDiscussions.map((item) => (
          <li key={item.slug}>
            <Link to={`/trend/${item.slug}`} className="block group">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 line-clamp-2">
                {item.title}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                {item.username && (
                  <span className="text-gray-700 font-medium">
                    u/{item.username}
                  </span>
                )}

                <span>💬 {item.comments}</span>
                <span>🔥 {item.popularityScore}</span>

                {item.createdAt && (
                  <span>{formatDate(item.createdAt)}</span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
