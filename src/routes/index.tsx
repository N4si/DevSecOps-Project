import { ElementType, lazy, Suspense } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import MainLoadingScreen from "src/components/MainLoadingScreen";

import MainLayout from "src/layouts/MainLayout";
import { MAIN_PATH } from "./paths";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<MainLoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function MainRoutes() {
  let routes = useRoutes([
    { path: "", element: <Navigate to={MAIN_PATH.browse} replace /> },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: MAIN_PATH.browse,
          children: [{ path: "", element: <HomePage /> }],
        },
        {
          path: MAIN_PATH.genreExplore,
          children: [{ path: ":genreId", element: <GenreExplorePage /> }],
        },
      ],
    },
  ]);
  return routes;
}

const HomePage = Loadable(lazy(() => import("src/pages/HomePage")));
const GenreExplorePage = Loadable(lazy(() => import("src/pages/GenreExplore")));
