import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../components/spinner";
import SKU from "../pages/SKU";

const StorePage = lazy(() => import("../pages/Store"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/sku" element={ <SKU />}/>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
