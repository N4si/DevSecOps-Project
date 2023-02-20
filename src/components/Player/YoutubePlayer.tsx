import { useRef, useEffect } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

type Props = {
  videoId: string;
  options: VideoJsPlayerOptions;
  onReady?: (player: VideoJsPlayer) => void;
};

function YoutubePlayer({ options, onReady, videoId }: Props) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered", "vjs-16-9");
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          techOrder: ["youtube"],
          sources: [
            {
              type: "video/youtube",
              src: `https://www.youtube.com/watch?v=${videoId}`,
            },
          ],
        },
        () => {
          videojs.log("player is ready");
          onReady && onReady(player);
        }
      ));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay as videojs.Autoplay);
      player.src(options.sources as videojs.Tech.SourceObject[]);
    }
  }, [options, onReady, videoId]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default YoutubePlayer;
