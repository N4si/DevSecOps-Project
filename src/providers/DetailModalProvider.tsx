import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Movie, MovieDetail, PaginatedResult } from "types/Movie";
import { axiosInstance } from "utils/axios";
import createSafeContext from "lib/createSafeContext";

export interface DetailModalConsumerProps {
  detail: MovieDetail | null;
  similarVideos: Movie[];
  onClose: VoidFunction;
  setVideoId: (id: number | null) => void;
}

export const [useDetailModal, Provider] =
  createSafeContext<DetailModalConsumerProps>();

export default function DetailModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [detailId, setDetailId] = useState<number | null>(null);
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [similarVideos, setSimilarVideos] = useState<Movie[]>([]);
  const location = useLocation();

  const handleClose = () => {
    setDetail(null);
    setDetailId(null);
    setSimilarVideos([]);
  };

  const handleChangeVideoId = (id: number | null) => {
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

  const providerValues: DetailModalConsumerProps = {
    detail,
    similarVideos,
    onClose: handleClose,
    setVideoId: handleChangeVideoId,
  };

  return <Provider value={providerValues}>{children}</Provider>;
}
