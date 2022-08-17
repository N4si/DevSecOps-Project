import InfiniteScroll from "react-infinite-scroller";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CommonTitle, PaginatedResult } from "types/Movie";
import { GenreType } from "types/Genre";
import VideoItemWithHover from "./VideoItemWithHover";

interface GridWithInfiniteScrollProps {
  genre: GenreType | CommonTitle;
  pageState: PaginatedResult;
  handleNext: (page: number) => void;
}
export default function GridWithInfiniteScroll({
  genre,
  pageState,
  handleNext,
}: GridWithInfiniteScrollProps) {
  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: "30px", sm: "60px" },
        pb: 4,
        pt: "150px",
        bgcolor: "inherit",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "text.primary", mb: 2 }}
      >{`${genre.name} Movies`}</Typography>
      <InfiniteScroll
        pageStart={1}
        loadMore={handleNext}
        hasMore={pageState.page < pageState.total_pages}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <Grid container spacing={2}>
          {pageState.results
            .filter((v) => !!v.backdrop_path)
            .map((video) => (
              <Grid key={video.id} item xs={6} sm={3} md={2} sx={{ zIndex: 1 }}>
                <VideoItemWithHover video={video} />
              </Grid>
            ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
