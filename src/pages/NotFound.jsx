import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 – Page Not Found | TrendBuzzs"
        description="The page you are looking for does not exist or has been moved."
        canonical="https://www.trendbuzzs.com/404"
        noIndex={true}
      />

      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">404</h1>
          <p className="mt-3 text-gray-600">
            Sorry, this page doesn’t exist or may have been removed.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to="/"
              className="px-5 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700"
            >
              Go Home
            </Link>

            <Link
              to="/trending"
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50"
            >
              View Trending
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
