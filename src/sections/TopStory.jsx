import { Link } from "react-router-dom";

export default function TopStory({ items }) {
  const main = items.find((i) => i.featured) || items[0];

  const rest = items.slice(1);

  return (
    <section>
      <Link to={`/${main.slug}`}>
        <img
          src={main.image}
          alt={main.title}
          className="w-full h-[380px] object-cover rounded-2xl"
        />
        <h1 className="mt-4 text-4xl font-extrabold">{main.title}</h1>
        <p className="mt-2 text-gray-600">{main.summary}</p>
      </Link>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {rest.map((item) => (
          <Link key={item._id} to={`/${item.slug}`}>
            <h3 className="font-semibold">{item.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
