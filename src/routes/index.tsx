import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes.tsx";
import { AppLayout } from "@app/components/layout/AppLayout";
import LoadingScreen from "@app/components/LoadingScreen";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen isLoading={true} />}>
      <Routes>
        <Route element={<AppLayout />}>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};
