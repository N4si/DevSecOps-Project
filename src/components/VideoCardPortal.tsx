import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import NetflixIconButton from "./NetflixIconButton";
import MaxLineTypography from "./MaxLineTypography";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import GenreBreadcrumbs from "./GenreBreadcrumbs";
import { useGetConfigurationQuery } from "src/store/slices/configuration";
import { MEDIA_TYPE } from "src/types/Common";
import { useGetGenresQuery } from "src/store/slices/genre";

interface VideoCardModalProps {
  video: Movie;
  anchorElement: HTMLElement;
}

export default function VideoCardModal({
  video,
  anchorElement,
}: VideoCardModalProps) {
  const { data: configuration } = useGetConfigurationQuery(undefined);
  const { data: genres } = useGetGenresQuery(MEDIA_TYPE.Movie);
  const { setPortal } = usePortal();
  const rect = anchorElement.getBoundingClientRect();
  const { setDetailType } = useDetailModal();

  return (
    <Card
      onMouseLeave={() => {
        setPortal(null, null);
      }}
      sx={{
        width: rect.width * 1.5,
        // height: rect.height * 2.5,
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        <Box
          component="img"
          src={`${configuration?.images.base_url}w780${video.backdrop_path}`}
          sx={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            backgroundPosition: "50%",
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            px: 2,
            pb: 0.5,
          }}
        >
          <MaxLineTypography
            maxLine={2}
            sx={{ width: "80%", fontWeight: 700 }}
            variant="h6"
          >
            {video.title}
          </MaxLineTypography>
          <Box flexGrow={1} />
          <NetflixIconButton size="large">
            <VolumeUpIcon />
          </NetflixIconButton>
        </Stack>
      </Box>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <IconButton
              size="large"
              sx={{
                p: 0,
                color: "white",
                height: { xs: 36, sm: 40 },
                "& > svg": {
                  fontSize: { xs: 36, sm: 40 },
                },
              }}
            >
              <PlayCircleIcon />
            </IconButton>
            <NetflixIconButton size="large">
              <AddIcon />
            </NetflixIconButton>
            <NetflixIconButton size="large">
              <ThumbUpOffAltIcon />
            </NetflixIconButton>
            <Box flexGrow={1} />
            <NetflixIconButton
              size="large"
              onClick={() => {
                setDetailType({ mediaType: MEDIA_TYPE.Movie, id: video.id });
              }}
            >
              <ExpandMoreIcon />
            </NetflixIconButton>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="subtitle1"
              sx={{ color: "success.main" }}
            >{`${getRandomNumber(100)}% Match`}</Typography>
            <AgeLimitChip label={`${getRandomNumber(20)}+`} />
            <Typography variant="subtitle2">{`${formatMinuteToReadable(
              getRandomNumber(180)
            )}`}</Typography>
            <QualityChip label="HD" />
          </Stack>
          {genres && (
            <GenreBreadcrumbs
              genres={genres
                .filter((genre) => video.genre_ids.includes(genre.id))
                .map((genre) => genre.name)}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
