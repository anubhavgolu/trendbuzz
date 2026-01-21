import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const REPORT_META = {
  title: "India Smartphone Debt Report (Estimated)",
  subtitle:
    "Statewise & citywise estimated smartphone financing debt (EMI/BNPL) — derived from a model-based approach",
  updated: "Jan 2026",
  period: "Base year: 2024 shipments | Compiled: Jan 2026",
  assumptions: {
    shipments_2024_million: 151,
    asp_usd: 259,
    usd_inr: 90.98,
    financed_share: 0.4,
  },
  disclaimer:
    "Disclaimer: This report contains estimates and is not official banking outstanding data. Results are derived from a simplified model (Shipments × ASP × USD-INR × Financed Share) and state/city distribution is based on proxy assumptions for informational purposes only.",
};

function formatINR(value) {
  return value.toLocaleString("en-IN");
}

function formatCr(valueCr) {
  return `${formatINR(Math.round(valueCr))} Cr`;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
const TOTALS = {
  total_financed_cr: 142325,
  total_market_value_cr: 355812,
};

const STATE_DATA = [
  { name: "Uttar Pradesh", debtCr: 24225, population: 241265000 },
  { name: "Bihar", debtCr: 13157, population: 131041000 },
  { name: "Maharashtra", debtCr: 12918, population: 128659000 },
  { name: "West Bengal", debtCr: 10061, population: 100202000 },
  { name: "Madhya Pradesh", debtCr: 8935, population: 88985000 },
  { name: "Rajasthan", debtCr: 8340, population: 83060000 },
  { name: "Tamil Nadu", debtCr: 7771, population: 77394000 },
  { name: "Gujarat", debtCr: 7381, population: 73513000 },
  { name: "Karnataka", debtCr: 6896, population: 68679000 },
  { name: "Andhra Pradesh", debtCr: 5380, population: 53586000 },
  { name: "Odisha", debtCr: 4714, population: 46953000 },
  { name: "Jharkhand", debtCr: 4079, population: 40626000 },
  { name: "Telangana", debtCr: 3866, population: 38499000 },
  { name: "Assam", debtCr: 3664, population: 36493000 },
  { name: "Kerala", debtCr: 3626, population: 36111000 },
  { name: "Delhi", debtCr: 2540, population: 33302000 },
  { name: "Punjab", debtCr: 2895, population: 30502000 },
  { name: "Haryana", debtCr: 2860, population: 29824000 },
  { name: "Chhattisgarh", debtCr: 2585, population: 32225000 }, // adjusted approx
  { name: "Uttarakhand", debtCr: 1150, population: 11250000 },
  { name: "Himachal Pradesh", debtCr: 470, population: 7400000 },
  { name: "Jammu & Kashmir", debtCr: 1250, population: 13700000 },
  { name: "Goa", debtCr: 170, population: 1600000 },
  { name: "Tripura", debtCr: 380, population: 4100000 },
  { name: "Manipur", debtCr: 290, population: 3200000 },
  { name: "Meghalaya", debtCr: 310, population: 3400000 },
  { name: "Nagaland", debtCr: 200, population: 2200000 },
  { name: "Arunachal Pradesh", debtCr: 150, population: 1600000 },
  { name: "Mizoram", debtCr: 120, population: 1300000 },
  { name: "Sikkim", debtCr: 55, population: 700000 },
  { name: "Puducherry", debtCr: 120, population: 1500000 },
  { name: "Chandigarh", debtCr: 90, population: 1200000 },
  { name: "Andaman & Nicobar", debtCr: 25, population: 430000 },
  {
    name: "Dadra & Nagar Haveli and Daman & Diu",
    debtCr: 45,
    population: 1200000,
  },
  { name: "Lakshadweep", debtCr: 3, population: 70000 },
];

const CITY_DATA = [
  { name: "Delhi (NCR)", debtCr: 4348, populationM: 30.22 },
  { name: "Kolkata", debtCr: 3244, populationM: 22.55 },
  { name: "Mumbai", debtCr: 2907, populationM: 20.2 },
  { name: "Bengaluru", debtCr: 1897, populationM: 13.19 },
  { name: "Chennai", debtCr: 1605, populationM: 11.15 },
  { name: "Hyderabad", debtCr: 1322, populationM: 9.19 },
  { name: "Ahmedabad", debtCr: 1098, populationM: 7.63 },
  { name: "Surat", debtCr: 994, populationM: 6.91 },
  { name: "Pune", debtCr: 981, populationM: 6.82 },
  { name: "Lucknow", debtCr: 727, populationM: 5.05 },
];

function SortButton({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-full text-sm border transition",
        active
          ? "bg-gray-900 text-white border-gray-900"
          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">
      {children}
    </span>
  );
}

export default function SmartphoneDebtReport() {
  const [tab, setTab] = useState("states");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("debt");
  const [sortDir, setSortDir] = useState("desc");
  const [topN, setTopN] = useState(15);

  const filteredStates = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = STATE_DATA;

    if (q) {
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }

    list = [...list].sort((a, b) => {
      if (sortKey === "name") {
        return sortDir === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      // debt
      return sortDir === "asc" ? a.debtCr - b.debtCr : b.debtCr - a.debtCr;
    });

    return list;
  }, [query, sortKey, sortDir]);

  const topStatesChart = useMemo(() => {
    return filteredStates.slice(0, clamp(topN, 5, 30));
  }, [filteredStates, topN]);

  const cityChart = useMemo(() => {
    return [...CITY_DATA].sort((a, b) => b.debtCr - a.debtCr);
  }, []);

  const summaryCards = useMemo(() => {
    return [
      {
        label: "Total Financed Debt (Est.)",
        value: `₹${(TOTALS.total_financed_cr / 100000).toFixed(2)} Trillion`,
        sub: `≈ ₹${formatINR(TOTALS.total_financed_cr)} Cr`,
      },
      {
        label: "Total Smartphone Market Value (Est.)",
        value: `₹${(TOTALS.total_market_value_cr / 100000).toFixed(
          2
        )} Trillion`,
        sub: `≈ ₹${formatINR(TOTALS.total_market_value_cr)} Cr`,
      },
      {
        label: "2024 Shipments (India)",
        value: `${REPORT_META.assumptions.shipments_2024_million} Million`,
        sub: "Shipment-based model",
      },
      {
        label: "Financing Share Assumption",
        value: `${Math.round(REPORT_META.assumptions.financed_share * 100)}%`,
        sub: "EMI/BNPL/consumer finance",
      },
    ];
  }, []);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {REPORT_META.title}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {REPORT_META.subtitle}
          </p>
          <p className="text-xs text-gray-500 mt-2">{REPORT_META.period}</p>

          <p className="text-xs text-gray-500 mt-3">{REPORT_META.disclaimer}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Pill>Updated: {REPORT_META.updated}</Pill>
            <Pill>Model: Shipments × ASP × Financed Share</Pill>
            <Pill>Unit: ₹ Crore</Pill>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("states")}
            className={[
              "px-4 py-2 rounded-xl text-sm font-medium border transition",
              tab === "states"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
            ].join(" ")}
          >
            Statewise
          </button>
          <button
            onClick={() => setTab("cities")}
            className={[
              "px-4 py-2 rounded-xl text-sm font-medium border transition",
              tab === "cities"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
            ].join(" ")}
          >
            Citywise
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4"
          >
            <div className="text-xs text-gray-500">{item.label}</div>
            <div className="mt-1 text-lg font-semibold text-gray-900">
              {item.value}
            </div>
            <div className="mt-1 text-xs text-gray-500">{item.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      {tab === "states" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900">
                Statewise Filters & Sorting
              </h3>
              <p className="text-sm text-gray-600">
                Search states and sort by name or estimated debt.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search state..."
                className="w-full sm:w-64 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />

              <div className="flex gap-2">
                <SortButton
                  active={sortKey === "debt"}
                  label="Sort: Debt"
                  onClick={() => setSortKey("debt")}
                />
                <SortButton
                  active={sortKey === "name"}
                  label="Sort: Name"
                  onClick={() => setSortKey("name")}
                />
                <SortButton
                  active={sortDir === "desc"}
                  label="Desc"
                  onClick={() => setSortDir("desc")}
                />
                <SortButton
                  active={sortDir === "asc"}
                  label="Asc"
                  onClick={() => setSortDir("asc")}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Chart Top N:</label>
            <input
              type="range"
              min={5}
              max={30}
              value={topN}
              onChange={(e) => setTopN(Number(e.target.value))}
              className="w-full md:w-64"
            />
            <span className="text-sm font-medium text-gray-900 w-10">
              {topN}
            </span>
          </div>
        </motion.div>
      )}

      {/* Chart Section */}
      {tab === "states" && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">
              Top States by Estimated Smartphone Debt (₹ Crore)
            </h3>
            <span className="text-xs text-gray-500">Top {topN}</span>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[1100px] h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topStatesChart}
                  margin={{ top: 10, right: 20, left: 0, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    tick={{ fontSize: 11 }}
                    angle={-25}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`₹${formatINR(v)} Cr`, "Debt"]} />
                  <Bar dataKey="debtCr" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {tab === "cities" && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 min-w-0 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">
              Top Cities by Estimated Smartphone Debt (₹ Crore)
            </h3>
            <span className="text-xs text-gray-500">Metros</span>
          </div>

          <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[1100px] h-[340px]">
              <ResponsiveContainer width="100%" aspect={2.2}>
                <BarChart
                  data={cityChart}
                  margin={{ top: 10, right: 20, left: 0, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    tick={{ fontSize: 11 }}
                    angle={-25}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`₹${formatINR(v)} Cr`, "Debt"]} />
                  <Bar dataKey="debtCr" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tables */}
      {tab === "states" && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">
              Full Statewise Breakdown
            </h3>
            <span className="text-xs text-gray-500">
              Rows: {filteredStates.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 pr-4">Rank</th>
                  <th className="py-2 pr-4">State / UT</th>
                  <th className="py-2 pr-4">Population (Approx)</th>
                  <th className="py-2 pr-4">Debt (₹ Crore)</th>
                </tr>
              </thead>
              <tbody>
                {filteredStates.map((row, i) => (
                  <tr key={row.name} className="border-b last:border-b-0">
                    <td className="py-2 pr-4 font-medium">{i + 1}</td>
                    <td className="py-2 pr-4">{row.name}</td>
                    <td className="py-2 pr-4 text-gray-600">
                      {formatINR(row.population)}
                    </td>
                    <td className="py-2 pr-4 font-semibold text-gray-900">
                      ₹{formatINR(row.debtCr)} Cr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              <div className="space-y-1">
                <p>
                  Note: This is a model-based estimate. State allocation is
                  calculated using a population-share proxy.
                </p>
                <p>
                  Formula: Shipments × ASP × USD-INR × Financed Share → Total
                  Debt → State Share.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {tab === "cities" && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">
              Citywise Breakdown (Metros)
            </h3>
            <span className="text-xs text-gray-500">
              Rows: {CITY_DATA.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 pr-4">Rank</th>
                  <th className="py-2 pr-4">City</th>
                  <th className="py-2 pr-4">Metro Pop (M)</th>
                  <th className="py-2 pr-4">Debt (₹ Crore)</th>
                </tr>
              </thead>
              <tbody>
                {[...CITY_DATA]
                  .sort((a, b) => b.debtCr - a.debtCr)
                  .map((row, i) => (
                    <tr key={row.name} className="border-b last:border-b-0">
                      <td className="py-2 pr-4 font-medium">{i + 1}</td>
                      <td className="py-2 pr-4">{row.name}</td>
                      <td className="py-2 pr-4 text-gray-600">
                        {row.populationM}
                      </td>
                      <td className="py-2 pr-4 font-semibold text-gray-900">
                        ₹{formatINR(row.debtCr)} Cr
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            <p>
              Note: City estimates are derived using a metro-weighted allocation
              model (urban premium assumption).
            </p>
          </div>
        </motion.div>
      )}

      {/* Sources / Assumptions */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4"
      >
        <h3 className="font-semibold text-gray-900 mb-2">
          Assumptions & Model Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-gray-100 p-3">
            <div className="text-xs text-gray-500">Shipments (India)</div>
            <div className="font-semibold text-gray-900">
              {REPORT_META.assumptions.shipments_2024_million} million units
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 p-3">
            <div className="text-xs text-gray-500">
              ASP (Average Selling Price)
            </div>
            <div className="font-semibold text-gray-900">
              ${REPORT_META.assumptions.asp_usd}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 p-3">
            <div className="text-xs text-gray-500">USD → INR</div>
            <div className="font-semibold text-gray-900">
              ₹{REPORT_META.assumptions.usd_inr}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 p-3">
            <div className="text-xs text-gray-500">Financed Share</div>
            <div className="font-semibold text-gray-900">
              {Math.round(REPORT_META.assumptions.financed_share * 100)}%
            </div>
          </div>
        </div>
        <p className="mt-3 flex items-start gap-2 text-xs text-gray-500">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <span>
            Disclaimer: This report contains estimates and is not official
            banking outstanding data. State/city distribution is based on proxy
            assumptions.
          </span>
        </p>
      </motion.div>
    </section>
  );
}
