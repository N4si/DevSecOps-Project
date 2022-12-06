import { ElementType, lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
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

const HomePage = Loadable(lazy(() => import("src/pages/HomePage")));
const GenreExplorePage = Loadable(lazy(() => import("src/pages/GenreExplore")));

function MainRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "", element: <Navigate to={MAIN_PATH.browse} /> },
        {
          path: "browse",
          element: <HomePage />,
        },
        {
          path: "genre",
          children: [{ path: ":genreId", element: <GenreExplorePage /> }],
        },
      ],
    },
  ]);
}
export default MainRoutes;
