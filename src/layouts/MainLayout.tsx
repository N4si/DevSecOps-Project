// import { ReactNode } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import DetailModal from "src/components/DetailModal";
import VideoPortalContainer from "src/components/VideoPortalContainer";
import DetailModalProvider from "src/providers/DetailModalProvider";
import PortalProvider from "src/providers/PortalProvider";

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
