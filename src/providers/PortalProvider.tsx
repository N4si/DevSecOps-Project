import { ReactNode, useState, useCallback } from "react";
import { Movie } from "src/types/Movie";
import createSafeContext from "src/lib/createSafeContext";

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

  const handleChangePortal = useCallback(
    (anchor: HTMLElement | null, video: Movie | null) => {
      setAnchorElement(anchor);
      setMiniModalMediaData(video);
    },
    []
  );

  return (
    <Provider
      value={{
        anchorElement,
        miniModalMediaData,
        setPortal: handleChangePortal,
      }}
    >
      {children}
    </Provider>
  );
}
