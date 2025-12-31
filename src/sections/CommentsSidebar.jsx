import { useEffect, useState } from "react";
import { fetchComments } from "../services/api";
import { formatRelativeTime } from "../utils/formatRelativeTime";

export default function CommentsSidebar({ slug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  if (!slug || slug.startsWith("nasa") || slug === "manual-news") {
  return null;
}


  useEffect(() => {
    async function load() {
      try {
        const data = await fetchComments(slug);
        setComments(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  function toggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <aside className="bg-white border rounded-xl p-5 sticky top-24">
      <h3 className="text-lg font-extrabold text-gray-900 mb-4">
        💬 Top Comments
      </h3>

      {loading && <p className="text-sm text-gray-500">Loading comments…</p>}

      {!loading && comments.length === 0 && (
        <p className="text-sm text-gray-500">No comments available.</p>
      )}

      <div className="space-y-5">
        {comments.map((c) => {
          const isExpanded = expandedId === c.id;
          const isLong = c.text.length > 180;

          return (
            <div key={c.id} className="border-b pb-4 last:border-none">
              {/* USER */}
              <p className="text-sm font-semibold text-gray-900">
                u/{c.username}
              </p>

              {/* COMMENT TEXT */}
              <p
                className={`mt-1 text-sm text-gray-700 leading-relaxed ${
                  !isExpanded ? "line-clamp-4" : ""
                }`}
              >
                {c.text}
              </p>

              {/* TOGGLE */}
              {isLong && (
                <button
                  onClick={() => toggle(c.id)}
                  className="mt-1 text-xs font-medium text-orange-600 hover:underline"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}

              {/* VOTES + TIME */}
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">⬆️</span>
                  <span className="font-medium text-gray-700">
                    {typeof c.score === "number" ? c.score : 0}
                  </span>
                </div>

                <span>{formatRelativeTime(c.createdAt)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* REDDIT LINK */}
      <a
        href={`https://www.reddit.com/comments/${slug}`}
        target="_blank"
        rel="noreferrer"
        className="block mt-4 text-sm font-medium text-orange-600"
      >
        View full discussion on Reddit →
      </a>
    </aside>
  );
}
