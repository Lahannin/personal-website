import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Secret = lazy(() => import("./pages/Secret"));

const AppRoutes = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/secret" element={<Secret />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
