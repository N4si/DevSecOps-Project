import { useAppDispatch, useAppSelector } from "hooks/redux";
import { ElementType, useEffect } from "react";
import { getConfiguration } from "store/slices/configuration";
import { GenreType } from "types/Genre";
import { CommonTitle, MEDIA_TYPE, PaginatedResult } from "types/Movie";
import { useImmer } from "use-immer";
import { axiosInstance } from "utils/axios";

export default function withInfiniteScroll(
  Component: ElementType,
  mediaType: MEDIA_TYPE,
  genre: GenreType | CommonTitle
) {
  return function WithInfiniteScroll() {
    const configuration = useAppSelector((state) => state.configuration);
    const dispatch = useAppDispatch();
    const [pageState, setPageState] = useImmer<PaginatedResult>({
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    });

    useEffect(() => {
      handleNext();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (!configuration.images) {
        dispatch(getConfiguration());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNext = (page: number = 1) => {
      if (genre.id) {
        axiosInstance
          .get<PaginatedResult>(`/discover/${mediaType}`, {
            params: { with_genres: genre.id, page },
          })
          .then((response) => {
            const { page, results, total_pages, total_results } = response.data;
            setPageState((draft) => {
              draft.page = page;
              draft.results.push(...results);
              draft.total_pages = total_pages;
              draft.total_results = total_results;
            });
          });
      } else {
        axiosInstance
          .get<PaginatedResult>(`/${mediaType}/${genre.apiString}`, {
            params: { page },
          })
          .then((response) => {
            const { page, results, total_pages, total_results } = response.data;
            setPageState((draft) => {
              draft.page = page;
              draft.results.push(...results);
              draft.total_pages = total_pages;
              draft.total_results = total_results;
            });
          });
      }
    };

    return (
      <Component genre={genre} pageState={pageState} handleNext={handleNext} />
    );
  };
}
