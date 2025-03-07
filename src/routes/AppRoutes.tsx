import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../components/spinner";

const StorePage = lazy(() => import("../pages/Store"));
const Planning = lazy(() => import("../pages/Planning"));
const SKU = lazy(() => import('../pages/SKU'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/sku" element={<SKU />} />
        <Route path="/plan" element={ <Planning/>}/>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
