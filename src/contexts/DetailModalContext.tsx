import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Movie, MovieDetail, PaginatedResult } from "types/Movie";
import { axiosInstance } from "utils/axios";
import DetailModal from "components/DetailModal";

export type DeailModalContextState = {
  setVideoId: Function;
};

const initialState: DeailModalContextState = {
  setVideoId: (id: number | null) => {},
};

const DetailModalContext = createContext(initialState);

interface DetailModalProviderProps {
  children: ReactNode;
}

export default function DetailModalProvider({
  children,
}: DetailModalProviderProps) {
  const [detailId, setDetailId] = useState<number | null>(null);
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [similarVideos, setSimilarVideos] = useState<Movie[]>([]);
  const location = useLocation();

  const handleClose = () => {
    setDetail(null);
    setDetailId(null);
    setSimilarVideos([]);
  };

  const handleDetailId = (id: number | null) => {
    setDetailId(id);
  };

  useEffect(() => {
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (detailId !== null) {
      axiosInstance
        .get(`/movie/${detailId}`, { params: { append_to_response: "videos" } })
        .then((response) => {
          const data = response.data as MovieDetail;
          setDetail(data);
        });

      axiosInstance.get(`/movie/${detailId}/similar`).then((response) => {
        const data = response.data as PaginatedResult;
        setSimilarVideos(data.results.filter((item) => !!item.backdrop_path));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailId]);

  return (
    <DetailModalContext.Provider
      value={{
        setVideoId: handleDetailId,
      }}
    >
      {children}
      <DetailModal
        detail={detail}
        similarVideos={similarVideos}
        onClose={handleClose}
      />
    </DetailModalContext.Provider>
  );
}

export { DetailModalContext };
