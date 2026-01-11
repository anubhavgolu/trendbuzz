import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import RequireAdmin from "./pages/admin/RequireAdmin";
import AdminContentEditor from "./pages/admin/AdminContentEditor";
import SectionManager from "./pages/admin/SectionManager";
import Contact from "./pages/Contact";
import EditorialPolicy from "./pages/EditorialPolicy";
import Article from "./pages/Article";

// 🟣 ADMIN (LAZY)

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
            <Route path="/article" element={<Article />} />

            {/* NEW */}
            <Route path="/trend/:slug" element={<Article />} />
            <Route path="/hi/trend/:slug" element={<Article />} />

            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />

            <Route path="/Contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
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
      <DefaultSEO />
      <ScrollToTop />

      <Routes>
        {/* 🌐 PUBLIC */}
        <Route path="/*" element={<PublicLayout />} />

        {/* 🔐 ADMIN (NO HEADER / FOOTER) */}



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
