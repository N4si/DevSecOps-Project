import { MiniModalPortalContext } from "contexts/MiniModalPortalContext";
import { useContext } from "react";

const useMiniModalPortal = () => useContext(MiniModalPortalContext);

export default useMiniModalPortal;
