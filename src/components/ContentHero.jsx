export default function ContentHero({
  title,
  summary,
  image,
  sourceName,
  sourceUrl,
  publishedAt,
}) {
  const date =
    publishedAt && !isNaN(new Date(publishedAt))
      ? new Date(publishedAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  return (
    <header className="max-w-4xl mx-auto px-4 pt-8">

      <div className="text-sm text-gray-500 mb-3">
        {sourceName && <span>Via {sourceName}</span>}
        {date && <span> · {date}</span>}
      </div>

    
      <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900">
        {title}
      </h1>

    
      {summary && (
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          {summary}
        </p>
      )}

      
      {image && (
        <div className="mt-6 rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full max-h-[520px] object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      )}
    </header>
  );
}
