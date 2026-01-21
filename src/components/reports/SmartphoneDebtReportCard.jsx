import { Link } from "react-router-dom";

export default function SmartphoneDebtReportCard() {
  return (
    <article
      className="
        rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 hover:scale-[1.01]
      "
    >
      <Link to="/reports/smartphone-debt" className="block">
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dxr4nmrui/image/upload/v1768992640/Report_On_India_Smartphone_Debt_Report_qpwhpi.webp"
            alt="India Smartphone Debt Report"
            className="h-48 w-full object-cover"
            loading="lazy"
          />

          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              Data Report
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 space-y-3">
        <Link to="/reports/smartphone-debt">
          <h3 className="font-bold text-gray-900 leading-snug hover:text-orange-600 transition line-clamp-2">
            India Smartphone Debt Report 2026: Statewise + Citywise Analysis
          </h3>
        </Link>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          EMI/BNPL based smartphone debt estimates across India with charts and
          full tables.
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-gray-400">
            By TrendBuzzs Desk • 1/21/2026
          </span>

          <Link
            to="/reports/smartphone-debt"
            className="text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
