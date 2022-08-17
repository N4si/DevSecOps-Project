import { ElementType, lazy, Suspense } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import MainLayout from "layouts/MainLayout";
import { MAIN_PATH } from "./paths";
import GenreExplore from "pages/GenreExplore";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function MainRoutes() {
  let routes = useRoutes([
    { path: "", element: <Navigate to={MAIN_PATH.browse} replace /> },
    {
      path: MAIN_PATH.browse,
      element: <MainLayout />,
      children: [{ path: "", element: <HomePage /> }],
    },
    {
      path: MAIN_PATH.genreExplore,
      element: <MainLayout />,
      children: [{ path: ":genreId", element: <GenreExplore /> }],
    },
  ]);
  return routes;
}

const HomePage = Loadable(lazy(() => import("pages/HomePage")));
