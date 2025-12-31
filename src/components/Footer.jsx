import logo from "../assets/trendbuzz_logo.png";
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
        {/* Brand */}
        <div className="flex flex-col items-start gap-2">
          <img
            src={logo}
            alt="TrendBuzz Logo"
            className="h-28 max-w-[220px] w-full object-contain"
          />

          <p className="text-sm text-gray-600 max-w-xs">
            Explaining why topics are trending on social media in simple words.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Pages</h4>
          <ul className="space-y-1">
            <li> <a href="/">Home</a></li>
            <li><a href="/search">Search</a></li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Legal</h4>
          <ul className="space-y-1">
            <ul className="space-y-1">
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/disclaimer">Disclaimer</a>
              </li>
            </ul>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 pb-4">
        © {new Date().getFullYear()} TrendBuzz. All rights reserved.
      </div>
    </footer>
  );
}
