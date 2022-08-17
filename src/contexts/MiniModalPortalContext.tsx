import { ReactNode, createContext, useState } from "react";
import { Movie } from "types/Movie";

export type MiniModalPortalContextProps = {
  anchorElement: HTMLElement | null;
  miniModalMediaData: Movie | null;
  setMiniModal: Function;
};

const initialState: MiniModalPortalContextProps = {
  anchorElement: null,
  miniModalMediaData: null,
  setMiniModal: (anchor: HTMLElement, video: Movie) => {},
};

const MiniModalPortalContext = createContext(initialState);

type MiniModalProviderProps = {
  children: ReactNode;
};

function MiniModalPortalProvider({ children }: MiniModalProviderProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [miniModalMediaData, setMiniModalMediaData] = useState<Movie | null>(
    null
  );
  return (
    <MiniModalPortalContext.Provider
      value={{
        anchorElement,
        miniModalMediaData,
        setMiniModal: (anchor: HTMLElement, video: Movie) => {
          setAnchorElement(anchor);
          setMiniModalMediaData(video);
        },
      }}
    >
      {children}
    </MiniModalPortalContext.Provider>
  );
}

export { MiniModalPortalProvider, MiniModalPortalContext };
