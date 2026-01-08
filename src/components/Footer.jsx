import logo from "../assets/trendbuzz_logo.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="h-20 overflow-hidden flex items-center">
            <img
              src={logo}
              alt="TrendBuzzs - Trending News & Explanations"
              className="
        h-28
        w-auto
        max-w-[220px]
        object-contain
        -mt-2
        translate-y-1
      "
            />
          </div>

          <p className="max-w-xs leading-relaxed text-sm text-gray-600">
            TrendBuzzs is an independent digital platform that explains why
            topics are trending on social media and in the news — clearly,
            accurately, and responsibly.
          </p>

          <p className="text-xs text-gray-500">
            Independent • Informational • No sponsored manipulation
          </p>
        </div>

        {/* Pages */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Pages</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-900">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="/privacy-policy" className="hover:text-gray-900">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/disclaimer" className="hover:text-gray-900">
                Disclaimer
              </a>
            </li>
            <li>
              <a href="/editorial-policy" className="hover:text-gray-900">
                Editorial Policy
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-900">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 pb-6">
        © {new Date().getFullYear()} TrendBuzzs.com — All rights reserved.
      </div>
    </footer>
  );
}
