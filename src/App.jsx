import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import ScrollToTop from "./components/ScrollToTop";
import InstallBanner from "./components/InstallBanner";

import Categories from "./pages/Categories";
import ContentDetail from "./pages/ContentDetail";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import CategoryPage from "./pages/CategoryPage";
import Trending from "./pages/Trending";
import Saved from "./pages/Saved";

import DefaultSEO from "./seo/DefaultSEO";
import RequireAdmin from "./pages/admin/RequireAdmin";

import AdminManualNews from "./pages/admin/AdminManualNews";
import AdminContentEditor from "./pages/admin/AdminContentEditor";
import SectionManager from "./pages/admin/SectionManager";

// 🟣 ADMIN (LAZY)
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics"));
const AdminHeatmap = lazy(() => import("./pages/AdminHeatmap"));

/* ================= PUBLIC LAYOUT ================= */
function PublicLayout() {
  return (
    <>
      <Header />

      <main className="min-h-screen pb-[72px]">
        <Suspense fallback={<div className="p-10">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Categories />} />
            <Route path="/trend/:slug" element={<ContentDetail />} />

            {/* UI ONLY – should be noindex */}
            <Route path="/trending" element={<Trending />} />
            <Route path="/saved" element={<Saved />} />

            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </Suspense>
      </main>

      <InstallBanner />
      <MobileBottomNav />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DefaultSEO />
      <ScrollToTop />

      <Routes>
        {/* 🌐 PUBLIC */}
        <Route path="/*" element={<PublicLayout />} />

        {/* 🔐 ADMIN (NO HEADER / FOOTER) */}
        <Route
          path="/admin/analytics"
          element={
            <RequireAdmin>
              <Suspense fallback={<div className="p-10">Loading…</div>}>
                <AdminAnalytics />
              </Suspense>
            </RequireAdmin>
          }
        />

        <Route
          path="/admin/heatmap"
          element={
            <RequireAdmin>
              <Suspense fallback={<div className="p-10">Loading…</div>}>
                <AdminHeatmap />
              </Suspense>
            </RequireAdmin>
          }
        />

        <Route
          path="/admin/manual-news"
          element={
            <RequireAdmin>
              <AdminManualNews />
            </RequireAdmin>
          }
        />

        <Route
          path="/admin/content"
          element={
            <RequireAdmin>
              <AdminContentEditor />
            </RequireAdmin>
          }
        />

        <Route
          path="/admin/sections"
          element={
            <RequireAdmin>
              <SectionManager />
            </RequireAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
