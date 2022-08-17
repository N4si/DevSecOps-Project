import withVideosPerGenre from "hoc/withVideosPerGenre";
import { Genre, MEDIA_TYPE, CommonTitle } from "types/Movie";
import SlickSlider from "./slick-slider/SlickSlider";

interface SliderRowForGenreProps {
  genre: Genre | CommonTitle;
  mediaType: MEDIA_TYPE;
}
export default function SliderRowForGenre({
  genre,
  mediaType,
}: SliderRowForGenreProps) {
  const Component = withVideosPerGenre(SlickSlider, mediaType, genre);
  return <Component />;
}
