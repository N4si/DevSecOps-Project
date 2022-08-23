// import { ReactNode } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";
import DetailModal from "components/DetailModal";
import VideoPortalContainer from "components/VideoPortalContainer";
import DetailModalProvider from "providers/DetailModalProvider";
import PortalProvider from "providers/PortalProvider";

// type MainLayoutProps = {
//   children: ReactNode;
// };

export default function MainLayout() {
  return (
    <>
      <Header />
      <DetailModalProvider>
        <DetailModal />
        <PortalProvider>
          <Outlet />
          <VideoPortalContainer />
        </PortalProvider>
      </DetailModalProvider>
      <Footer />
    </>
  );
}
