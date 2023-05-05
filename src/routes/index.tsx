import { ElementType, lazy, Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLoadingScreen from "src/components/MainLoadingScreen";
import { MAIN_PATH } from "src/constant";

import MainLayout from "src/layouts/MainLayout";
import WatchPage from "src/pages/WatchPage";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<MainLoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const HomePage = Loadable(lazy(() => import("src/pages/HomePage")));
const GenreExplorePage = Loadable(lazy(() => import("src/pages/GenreExplore")));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: MAIN_PATH.root,
        element: <Navigate to={`/${MAIN_PATH.browse}`} />,
      },
      {
        path: MAIN_PATH.browse,
        element: <HomePage />,
      },
      {
        path: MAIN_PATH.genreExplore,
        children: [{ path: ":genreId", element: <GenreExplorePage /> }],
      },
      {
        path: MAIN_PATH.watch,
        element: <WatchPage />,
      },
    ],
  },
]);

export default router;
