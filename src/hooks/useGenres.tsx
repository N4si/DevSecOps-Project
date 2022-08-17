import { useEffect } from "react";
import { getGenres } from "store/slices/genre";
import { MEDIA_TYPE } from "types/Movie";
import { useAppDispatch, useAppSelector } from "./redux";

function useGenres(mediaType: MEDIA_TYPE) {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.genres[mediaType]);

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(getGenres({ mediaType }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType, dispatch]);

  return [genres];
}

export default useGenres;
