import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Index is eagerly imported so hydration matches the pre-rendered HTML.
// If Index were lazy, the first client render would be Suspense fallback={null},
// which mismatches the server-rendered Navigation + Hero → React error #418/#423.
import Index from "./pages/Index";

const ArticlesIndex = lazy(() => import("./pages/ArticlesIndex"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Secret = lazy(() => import("./pages/Secret"));

const AppRoutes = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/articles" element={<ArticlesIndex />} />
      <Route path="/articles/:slug" element={<ArticleDetail />} />
      <Route path="/secret" element={<Secret />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
