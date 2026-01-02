import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import ScrollToTop from "./components/ScrollToTop";
import InstallBanner from "./components/InstallBanner";

import Categories from "./pages/Categories";
import TrendDetail from "./pages/TrendDetail";
import Search from "./pages/Search";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import CategoryPage from "./pages/CategoryPage";
import Trending from "./pages/Trending";
import Saved from "./pages/Saved";

import PageTracker from "./components/PageTracker";
import ClickTracker from "./components/ClickTracker";
import AdminManualNews from "./pages/admin/AdminManualNews";

import DefaultSEO from "./seo/DefaultSEO";
import RequireAdmin from "./admin/RequireAdmin";

// 🟣 ADMIN (LAZY)
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics"));
const AdminHeatmap = lazy(() => import("./pages/AdminHeatmap"));

export default function App() {
  return (
    <BrowserRouter>
      <DefaultSEO />

      <Suspense fallback={null}>
        <PageTracker />
        <ClickTracker />
      </Suspense>

      <ScrollToTop />

      <Routes>
        {/* 🌐 PUBLIC SITE */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="min-h-screen pb-[72px]">
                <Suspense fallback={<div className="p-10">Loading…</div>}>
                  <Routes>
                    <Route path="/" element={<Categories />} />
                    <Route path="/trend/:slug" element={<TrendDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route
                      path="/category/:category"
                      element={<CategoryPage />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/saved" element={<Saved />} />
                  </Routes>
                </Suspense>
              </main>
              <InstallBanner />
              <MobileBottomNav />
              <Footer />
            </>
          }
        />

        {/* 🔐 ADMIN (NO HEADER / FOOTER) */}
        <Route
          path="/admin/analytics"
          element={
            <RequireAdmin>
              <AdminAnalytics />
            </RequireAdmin>
          }
        />

        <Route
          path="/admin/heatmap"
          element={
            <RequireAdmin>
              <AdminHeatmap />
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
      </Routes>
    </BrowserRouter>
  );
}
