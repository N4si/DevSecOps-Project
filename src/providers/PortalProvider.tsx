import { ReactNode, useState } from "react";
import { Movie } from "types/Movie";
import createSafeContext from "lib/createSafeContext";

export interface PortalConsumerProps {
  anchorElement: HTMLElement | null;
  miniModalMediaData: Movie | null;
  setPortal: (anchor: HTMLElement | null, vidoe: Movie | null) => void;
}

export const [usePortal, Provider] = createSafeContext<PortalConsumerProps>();

export default function PortalProvider({ children }: { children: ReactNode }) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [miniModalMediaData, setMiniModalMediaData] = useState<Movie | null>(
    null
  );

  const handleChangePortal = (
    anchor: HTMLElement | null,
    video: Movie | null
  ) => {
    setAnchorElement(anchor);
    setMiniModalMediaData(video);
  };

  const providerValues: PortalConsumerProps = {
    anchorElement,
    miniModalMediaData,
    setPortal: handleChangePortal,
  };

  return <Provider value={providerValues}>{children}</Provider>;
}
