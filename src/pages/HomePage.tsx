import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import useGenres from "hooks/useGenres";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getConfiguration } from "store/slices/configuration";
import { CommonTitle, MEDIA_TYPE } from "types/Movie";
import { COMMON_TITLES } from "constant";
import { GenreType } from "types/Genre";
import TopTrailer from "components/TopTrailer";
import SliderRowForGenre from "components/VideoSlider";

function HomePage() {
  const [genres] = useGenres(MEDIA_TYPE.Movie);
  const configuration = useAppSelector((state) => state.configuration);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!configuration.images) {
      dispatch(getConfiguration());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (genres.length) {
    return (
      <Stack spacing={2} sx={{ bgcolor: "background.default" }}>
        <TopTrailer mediaType={MEDIA_TYPE.Movie} />
        {[...COMMON_TITLES, ...genres].map((genre: GenreType | CommonTitle) => (
          <SliderRowForGenre
            key={genre.id || genre.name}
            genre={genre}
            mediaType={MEDIA_TYPE.Movie}
          />
        ))}
      </Stack>
    );
  }
  return null;
}

export default HomePage;
