import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NasaCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 🔁 AUTO SLIDE (only after image loaded)
  useEffect(() => {
    if (!items || items.length === 0) return;

    const id = setInterval(() => {
      setImageLoaded(false); // 👈 important
      setIndex((i) => (i + 1) % items.length);
    }, 6000);

    return () => clearInterval(id);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  const current = items[index];

  return (
    <section className="mb-14">
      <h2 className="text-2xl font-extrabold mb-4">
         Space & Science Spotlight
      </h2>

      <div className="relative rounded-2xl overflow-hidden">
        <Link to={`/trend/${current.slug}`}>
          {/* IMAGE */}
          <img
            key={current.slug} // 🔥 forces correct image render
            src={current.image}
            alt={current.title}
            loading="eager"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-80 object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* TEXT */}
          <div className="absolute bottom-0 p-6 text-white">
            <p className="text-sm opacity-90 mb-1">NASA · Space</p>
            <h3 className="text-2xl font-bold">
              {current.title}
            </h3>
          </div>
        </Link>

        {/* MANUAL CONTROLS */}
        <button
          onClick={() => {
            setImageLoaded(false);
            setIndex((index - 1 + items.length) % items.length);
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded"
        >
          ‹
        </button>

        <button
          onClick={() => {
            setImageLoaded(false);
            setIndex((index + 1) % items.length);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded"
        >
          ›
        </button>
      </div>
    </section>
  );
}
