import { Outlet, useLocation } from "react-router-dom";
import DetailModal from "src/components/DetailModal";
import VideoPortalContainer from "src/components/VideoPortalContainer";
import DetailModalProvider from "src/providers/DetailModalProvider";
import PortalProvider from "src/providers/PortalProvider";
import { Footer, MainHeader } from "src/components/layouts";
import { MAIN_PATH } from "src/constant";

export default function MainLayout() {
  const location = useLocation();
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
      {location.pathname !== `/${MAIN_PATH.watch}` && <Footer />}
    </>
  );
}
