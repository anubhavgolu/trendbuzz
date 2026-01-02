export default function VideoSection({ items }) {
  return (
    <section>
      <h2 className="text-2xl font-bold">🎥 Videos</h2>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {items.map((v) => (
          <div key={v._id}>
            <iframe
              src={v.video.embedUrl}
              className="w-full h-64 rounded-xl"
              loading="lazy"
            />
            <h3 className="mt-3 font-semibold">{v.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
