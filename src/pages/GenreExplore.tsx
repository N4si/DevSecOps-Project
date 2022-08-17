import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGenres from "hooks/useGenres";
import { CommonTitle, MEDIA_TYPE } from "types/Movie";
import { COMMON_TITLES } from "constant";
import { GenreType } from "types/Genre";
import GridPage from "components/GridPage";

export default function GenreExplore() {
  const { genreId } = useParams();
  const [genres] = useGenres(MEDIA_TYPE.Movie);
  let [genre, setGenre] = useState<GenreType | CommonTitle | undefined>(
    undefined
  );

  useEffect(() => {
    if (
      genreId !== undefined &&
      [
        ...COMMON_TITLES.map((t) => t.apiString),
        ...genres.map((g) => g.id.toString()),
      ].includes(genreId)
    ) {
      if (isNaN(parseInt(genreId))) {
        setGenre(COMMON_TITLES.find((t) => t.apiString === genreId));
      } else {
        setGenre(genres.find((t) => t.id.toString() === genreId));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genres, genreId]);

  if (genre) {
    return <GridPage mediaType={MEDIA_TYPE.Movie} genre={genre} />;
  }
  return null;
}
