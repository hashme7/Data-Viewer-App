import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../components/spinner";

const StorePage = lazy(() => import("../pages/StorePage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<StorePage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
