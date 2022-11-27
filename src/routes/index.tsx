import { ElementType, lazy, Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
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

const routes = createBrowserRouter([
  { path: "/", element: <Navigate to={MAIN_PATH.browse} /> },
  {
    element: <MainLayout />,
    children: [
      {
        path: "browse",
        children: [{ path: "", element: <HomePage /> }],
      },
      {
        path: "genre",
        children: [{ path: ":genreId", element: <GenreExplorePage /> }],
      },
    ],
  },
]);

export default routes;
