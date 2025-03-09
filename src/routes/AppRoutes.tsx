import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../components/spinner";

const StorePage = lazy(() => import("../pages/Store"));
const Planning = lazy(() => import("../pages/Planning"));
const SKUPage = lazy(() => import("../pages/SKU"));
const Chart = lazy(() => import("../pages/Chart"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/sku" element={<SKUPage />} />
        <Route path="/plan" element={<Planning />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
