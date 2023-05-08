import { useParams } from "react-router-dom";
import { COMMON_TITLES } from "src/constant";
import GridPage from "src/components/GridPage";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import { useGetGenresQuery } from "src/store/slices/genre";

export function Component() {
  const { genreId } = useParams();
  const { data: genres } = useGetGenresQuery(MEDIA_TYPE.Movie);
  let genre: Genre | CustomGenre | undefined;
  if (isNaN(parseInt(genreId as string))) {
    genre = COMMON_TITLES.find((t) => t.apiString === genreId);
  } else {
    genre = genres?.find((t) => t.id.toString() === genreId);
  }
  if (genre) {
    return <GridPage mediaType={MEDIA_TYPE.Movie} genre={genre} />;
  }
  return null;
}

Component.displayName = "GenreExplore";
