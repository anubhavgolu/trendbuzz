import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import ScrollToTop from "./components/ScrollToTop";
import Categories from "./pages/Categories";
import ContentDetail from "./pages/ContentDetail";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import CategoryPage from "./pages/CategoryPage";
import Trending from "./pages/Trending";
import DefaultSEO from "./seo/DefaultSEO";
import PublisherSEO from "./seo/PublisherSEO ";
import RequireAdmin from "./pages/admin/RequireAdmin";
import AdminContentEditor from "./pages/admin/AdminContentEditor";
import Contact from "./pages/Contact";
import EditorialPolicy from "./pages/EditorialPolicy";
import Article from "./pages/Article";
import ArticleList from "./pages/ArticleList";
import Schedule from "./pages/sports/t20-world-cup-2026/Schedule";
import PointsTable from "./pages/sports/t20-world-cup-2026/PointsTable";
import Groups from "./pages/sports/t20-world-cup-2026/Groups";
import Teams from "./pages/sports/t20-world-cup-2026/Teams";
import InstagramAnalyzer from "./pages/IntagramAnalyzer/InstagramAnalyzer";

function PublicLayout() {
  return (
    <>
      <Header />

      <main className="min-h-screen pb-[72px]">
        <Suspense fallback={<div className="p-10">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Categories />} />
            <Route path="/instagram-analyzer" element={<InstagramAnalyzer />} />
            <Route
              path="/instagram-compare"
              element={
                <Navigate to="/instagram-analyzer?tab=compare" replace />
              }
            />
            <Route path="/trend/:slug" element={<ContentDetail />} />
            <Route path="/article" element={<ArticleList />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/hi/article/:slug" element={<Article />} />

            <Route path="/trending" element={<Trending />} />

            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />

            <Route path="/Contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route
              path="/sports/t20-world-cup-2026/schedule"
              element={<Schedule />}
            />

            <Route
              path="/sports/t20-world-cup-2026/groups"
              element={<Groups />}
            />

            <Route
              path="/sports/t20-world-cup-2026/teams"
              element={<Teams />}
            />

            <Route
              path="/sports/t20-world-cup-2026/points-table"
              element={<PointsTable />}
            />
          </Routes>
        </Suspense>
      </main>
      <MobileBottomNav />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PublisherSEO />
      <DefaultSEO />
      <ScrollToTop />

      <Routes>
        <Route path="/*" element={<PublicLayout />} />

        <Route
          path="/admin/content"
          element={
            <RequireAdmin>
              <AdminContentEditor />
            </RequireAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
