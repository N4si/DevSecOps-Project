import withInfiniteScroll from "hoc/withInfiniteScroll";
import { Genre, MEDIA_TYPE, CommonTitle } from "types/Movie";
import GridWithInfiniteScroll from "./GridWithInfiniteScroll";

interface GridPageProps {
  genre: Genre | CommonTitle;
  mediaType: MEDIA_TYPE;
}
export default function GridPage({ genre, mediaType }: GridPageProps) {
  const Component = withInfiniteScroll(
    GridWithInfiniteScroll,
    mediaType,
    genre
  );
  return <Component />;
}
