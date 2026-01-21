import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import DefaultSEO from "./seo/DefaultSEO";
import PublisherSEO from "./seo/PublisherSEO";
import RequireAdmin from "./pages/admin/RequireAdmin";
import AdSenseLoader from "./components/AdSenseLoader";


const Categories = lazy(() => import("./pages/Categories"));
const ContentDetail = lazy(() => import("./pages/ContentDetail"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const Trending = lazy(() => import("./pages/Trending"));
const Contact = lazy(() => import("./pages/Contact"));
const EditorialPolicy = lazy(() => import("./pages/EditorialPolicy"));
const Article = lazy(() => import("./pages/Article"));
const ArticleList = lazy(() => import("./pages/ArticleList"));
const AdminContentEditor = lazy(() =>
  import("./pages/admin/AdminContentEditor")
);

const Schedule = lazy(() =>
  import("./pages/sports/t20-world-cup-2026/Schedule")
);
const PointsTable = lazy(() =>
  import("./pages/sports/t20-world-cup-2026/PointsTable")
);
const Groups = lazy(() => import("./pages/sports/t20-world-cup-2026/Groups"));
const Teams = lazy(() => import("./pages/sports/t20-world-cup-2026/Teams"));
const Footer = lazy(() => import("./components/Footer"));
const MobileBottomNav = lazy(() => import("./components/MobileBottomNav"));

const InstagramAnalyzer = lazy(() =>
  import("./pages/IntagramAnalyzer/InstagramAnalyzer")
);

function PublicLayout() {
  return (
    <>
    <AdSenseLoader client="ca-pub-XXXX" delay={2000} />
      <Header />

      <main className="min-h-screen pb-[72px]">
        <Suspense
          fallback={<div className="p-6 text-sm text-gray-500">Loading…</div>}
        >
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
            <Route path="/contact" element={<Contact />} />
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

      <Suspense fallback={null}>
        <MobileBottomNav />
        <Footer />
      </Suspense>
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
            <Suspense fallback={<div className="p-10">Loading…</div>}>
              <RequireAdmin>
                <AdminContentEditor />
              </RequireAdmin>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
