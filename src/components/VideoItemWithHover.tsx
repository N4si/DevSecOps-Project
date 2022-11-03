import { useEffect, useState, useRef } from "react";
import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import { useGetConfigurationQuery } from "src/store/slices/configuration";
import { useDebounce } from "react-use";
import VideoItemWithHoverPure from "./VideoItemWithHoverPure";

interface VideoItemWithHoverProps {
  video: Movie;
}

export default function VideoItemWithHover({ video }: VideoItemWithHoverProps) {
  const { setPortal } = usePortal();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { data: configuration } = useGetConfigurationQuery(undefined);
  const [debouncedHoverStated, setDebouncedHoverState] = useState(false);
  useDebounce(
    () => {
      setDebouncedHoverState(isHovered);
    },
    700,
    [isHovered]
  );

  useEffect(() => {
    if (debouncedHoverStated) {
      setPortal(elementRef.current, video);
    }
  }, [debouncedHoverStated]);

  return (
    <VideoItemWithHoverPure
      src={`${configuration?.images.base_url}w300${video.backdrop_path}`}
      handleHover={setIsHovered}
      ref={elementRef}
    />
  );
}
