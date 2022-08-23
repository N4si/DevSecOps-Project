import { forwardRef, useState } from "react";
import ReactPlayer from "react-player/youtube";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// import { Movie, MovieDetail } from "types/Movie";
import { YOUTUBE_URL } from "constant";
import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import NetflixIconButton from "./NetflixIconButton";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import { formatMinuteToReadable, getRandomNumber } from "utils/common";
import SimilarVideoCard from "./SimilarVideoCard";
import { useDetailModal } from "providers/DetailModalProvider";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// interface DetailModalProps {
//   detail: MovieDetail | null;
//   similarVideos: Movie[];
//   onClose: VoidFunction;
// }

export default function DetailModal() {
  const [mute, setMute] = useState(false);
  const { detail, similarVideos, onClose } = useDetailModal();

  return (
    <Dialog
      fullWidth
      scroll="body"
      maxWidth="md"
      open={detail !== null}
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ p: 0, bgcolor: "#181818" }}>
        {/* <Box sx={{ position: "relative" }}> */}
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            position: "relative",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              paddingTop: "calc(9 / 16 * 100%)",
            }}
          >
            <ReactPlayer
              loop
              muted={mute}
              playing={true}
              width="100%"
              height="100%"
              url={`${YOUTUBE_URL}${
                detail?.videos.results[0].key || "L3oOldViIgY"
              }`}
              style={{ position: "absolute", top: 0 }}
            />

            <Box
              sx={{
                background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                top: 0,
                left: 0,
                bottom: 0,
                right: "26.09%",
                opacity: 1,
                position: "absolute",
                transition: "opacity .5s",
              }}
            />
            <Box
              sx={{
                backgroundColor: "transparent",
                backgroundImage:
                  "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "0px top",
                backgroundSize: "100% 100%",
                bottom: 0,
                position: "absolute",
                height: "14.7vw",
                opacity: 1,
                top: "auto",
                width: "100%",
              }}
            />
            <IconButton
              onClick={onClose}
              sx={{
                top: 15,
                right: 15,
                position: "absolute",
                bgcolor: "#181818",
                width: { xs: 22, sm: 40 },
                height: { xs: 22, sm: 40 },
                "&:hover": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <CloseIcon
                sx={{ color: "white", fontSize: { xs: 14, sm: 22 } }}
              />
            </IconButton>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 16,
                px: { xs: 2, sm: 3, md: 5 },
              }}
            >
              <MaxLineTypography variant="h4" maxLine={1} sx={{ mb: 2 }}>
                {detail?.title}
              </MaxLineTypography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <PlayButton sx={{ color: "black", py: 0 }} />
                <NetflixIconButton>
                  <AddIcon />
                </NetflixIconButton>
                <NetflixIconButton>
                  <ThumbUpOffAltIcon />
                </NetflixIconButton>
                <Box flexGrow={1} />
                <NetflixIconButton
                  size="large"
                  onClick={() => {
                    setMute((v) => !v);
                  }}
                  sx={{ zIndex: 2 }}
                >
                  {!mute ? <VolumeUpIcon /> : <VolumeOffIcon />}
                </NetflixIconButton>
              </Stack>

              <Container
                sx={{
                  // py: 2,
                  // px: { xs: 2, sm: 3, md: 5 },
                  p: "0px !important",
                }}
              >
                <Grid container spacing={5} alignItems="center">
                  <Grid item xs={12} sm={6} md={8}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "success.main" }}
                      >{`${getRandomNumber(100)}% Match`}</Typography>
                      <Typography variant="body2">
                        {detail?.release_date.substring(0, 4)}
                      </Typography>
                      <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                      <Typography variant="subtitle2">{`${formatMinuteToReadable(
                        getRandomNumber(180)
                      )}`}</Typography>
                      <QualityChip label="HD" />
                    </Stack>

                    <MaxLineTypography
                      maxLine={3}
                      variant="body1"
                      sx={{ mt: 2 }}
                    >
                      {detail?.overview}
                    </MaxLineTypography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="body2" sx={{ my: 1 }}>
                      {`Genres : ${detail?.genres
                        .map((g) => g.name)
                        .join(", ")}`}
                    </Typography>
                    <Typography variant="body2" sx={{ my: 1 }}>
                      {`Available in : ${detail?.spoken_languages
                        .map((l) => l.name)
                        .join(", ")}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
          {similarVideos.length && (
            <Container
              sx={{
                py: 2,
                px: { xs: 2, sm: 3, md: 5 },
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                More Like This
              </Typography>
              <Grid container spacing={2}>
                {similarVideos.map((sm) => (
                  <Grid item xs={6} sm={4} key={sm.id}>
                    <SimilarVideoCard video={sm} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
        </Box>
        {/* </Box> */}
      </DialogContent>
    </Dialog>
  );
}
