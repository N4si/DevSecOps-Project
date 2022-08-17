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
import { Movie } from "types/Movie";
import { useAppSelector } from "hooks/redux";
import useMiniModalPortal from "hooks/useMiniModalPortal";
import NetflixIconButton from "./NetflixIconButton";
import MaxLineTypography from "./MaxLineTypography";
import { formatMinuteToReadable, getRandomNumber } from "utils/common";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import GenreBreadcrumbs from "./GenreBreadcrumbs";
import useDetailModal from "hooks/useDetailModal";

interface MiniMediaModalProps {
  video: Movie;
  anchorElement: HTMLElement;
}

export default function MiniMediaModal({
  video,
  anchorElement,
}: MiniMediaModalProps) {
  const genres = useAppSelector((state) => state.genres.movie);
  const configuration = useAppSelector((state) => state.configuration);
  const { setMiniModal } = useMiniModalPortal();
  const rect = anchorElement.getBoundingClientRect();
  const { setVideoId } = useDetailModal();

  return (
    <Card
      onMouseLeave={() => {
        setMiniModal(null, null);
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
          src={`${configuration.images?.base_url}w780${video.backdrop_path}`}
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
                setVideoId(video.id);
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
          <GenreBreadcrumbs
            genres={genres
              .filter((genre) => video.genre_ids.includes(genre.id))
              .map((genre) => genre.name)}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
