// import { ReactNode } from "react";
import Header from "../components/Header";
import { MiniModalPortalProvider } from "contexts/MiniModalPortalContext";
import MiniModalPortal from "components/MiniModalPortal";
import DetailModalProvider from "contexts/DetailModalContext";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";

// type MainLayoutProps = {
//   children: ReactNode;
// };

export default function MainLayout() {
  return (
    <>
      <Header />
      <DetailModalProvider>
        <MiniModalPortalProvider>
          <Outlet />
          <MiniModalPortal />
        </MiniModalPortalProvider>
      </DetailModalProvider>
      <Footer />
    </>
  );
}
