import { Outlet } from "react-router-dom";
import DetailModal from "src/components/DetailModal";
import VideoPortalContainer from "src/components/VideoPortalContainer";
import DetailModalProvider from "src/providers/DetailModalProvider";
import PortalProvider from "src/providers/PortalProvider";
import { Footer, MainHeader } from "src/components/layouts";

export default function MainLayout() {
  return (
    <>
      <MainHeader />
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
