import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import ReactPlayer from "react-player";
import YouTubePlayer from "react-player/youtube";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// import { useAppSelector } from "hooks/redux";
import {
  MEDIA_TYPE,
  // Movie,
  MovieDetail,
  PaginatedResult,
} from "types/Movie";
import { axiosInstance } from "utils/axios";
import { getRandomNumber } from "utils/common";
import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import MoreInfoButton from "./MoreInfoButton";
import NetflixIconButton from "./NetflixIconButton";
import MaturityRate from "./MaturityRate";
import { YOUTUBE_URL } from "constant";
import useOffSetTop from "hooks/useOffSetTop";
import { useDetailModal } from "providers/DetailModalProvider";

interface TopTrailerProps {
  mediaType: MEDIA_TYPE;
}

export default function TopTrailer({ mediaType }: TopTrailerProps) {
  const playerRef = useRef<YouTubePlayer>(null);
  const [mute, setMute] = useState(false);
  const [video, setVideo] = useState<MovieDetail | null>(null);
  const isOffset = useOffSetTop(window.innerWidth * 0.5625);
  const { setVideoId } = useDetailModal();
  const maturityRate = useMemo(() => {
    return getRandomNumber(20);
  }, []);

  const handleReady = useCallback((player: ReactPlayer) => {
    // console.log("onReady: ", player);
    player.getInternalPlayer().playVideo();
    // if (playerRef.current) {
    //   playerRef.current.getInternalPlayer().playVideo();
    // }
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      if (isOffset) {
        playerRef.current.getInternalPlayer().pauseVideo();
      } else {
        playerRef.current.getInternalPlayer().playVideo();
      }
    }
  }, [isOffset]);

  useEffect(() => {
    axiosInstance.get(`/${mediaType}/popular`).then((response) => {
      const { results } = response.data as PaginatedResult;
      const videos = results.filter((item) => !!item.backdrop_path);
      const randomVideo = videos[getRandomNumber(videos.length)];
      axiosInstance
        .get(`/movie/${randomVideo.id}`, {
          params: {
            append_to_response: "videos",
          },
        })
        .then((response) => {
          setVideo(response.data);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (video) {
    return (
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            position: "relative",
            pb: "40%",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              height: "56.25vw",
              // paddingTop: "calc(9 / 16 * 100%)",
            }}
          >
            <Box
              sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
              }}
            >
              {/* <Box
                component="img"
                src={`${configuration.images?.base_url}original${video.backdrop_path}`}
                sx={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  // height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  backgroundPosition: "50%",
                }}
              /> */}
              <YouTubePlayer
                loop
                ref={playerRef}
                width="100%"
                height="100%"
                muted={mute}
                config={{
                  onUnstarted: () => {
                    // console.log("onUnstarted: ");
                    if (playerRef.current) {
                      // console.log("Unstarted: ");
                      playerRef.current.getInternalPlayer().playVideo();
                    }
                  },
                  // not working
                  playerVars: {
                    controls: 0,
                    autoplay: 1,
                    modestbranding: 1,
                    iv_load_policy: 3,
                  },
                  embedOptions: {
                    controls: 0,
                    autoplay: 1,
                    modestbranding: 1,
                    iv_load_policy: 3,
                  },
                }}
                url={`${YOUTUBE_URL}${
                  video.videos.results[0]?.key || "L3oOldViIgY"
                }`}
                onReady={handleReady}
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
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                  position: "absolute",
                  right: 0,
                  bottom: "35%",
                }}
              >
                <NetflixIconButton
                  size="large"
                  onClick={() => {
                    setMute((v) => !v);
                  }}
                  sx={{ zIndex: 2 }}
                >
                  {!mute ? <VolumeUpIcon /> : <VolumeOffIcon />}
                </NetflixIconButton>
                <MaturityRate>{`${maturityRate}+`}</MaturityRate>
              </Stack>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Stack
                spacing={4}
                sx={{
                  bottom: "35%",
                  position: "absolute",
                  left: { xs: "4%", md: "60px" },
                  top: 0,
                  width: "36%",
                  zIndex: 10,
                  justifyContent: "flex-end",
                }}
              >
                <MaxLineTypography
                  variant="h2"
                  maxLine={1}
                  color="text.primary"
                >
                  {video.title}
                </MaxLineTypography>
                <MaxLineTypography
                  variant="h5"
                  maxLine={3}
                  color="text.primary"
                >
                  {video.overview}
                </MaxLineTypography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <PlayButton size="large" />
                  <MoreInfoButton
                    size="large"
                    onClick={() => {
                      console.log("MoreInfo: ");
                      setVideoId(video.id);
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
}
