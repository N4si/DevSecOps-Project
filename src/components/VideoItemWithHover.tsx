import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { Movie } from "types/Movie";
import { useAppSelector } from "hooks/redux";
import useMiniModalPortal from "hooks/useMiniModalPortal";

const PaperStyle = styled(Paper)(({ theme }) => ({
  borderRadius: "4px",
  zIndex: 9,
  cursor: "pointer",
  position: "relative",
  // transition: "transform .5s",
  // [theme.breakpoints.up("sm")]: {
  //   "&:hover": {
  //     zIndex: 10,
  //     msTransform: "scale(1.5, 3)",
  //     WebkitTransform: "scale(1.5, 3)",
  //     transform: "scale(1.5, 3)",
  //   },
  //   "&:hover .MuiBox-root": {
  //     visibility: "visible",
  //   },
  // },
}));

interface VideoItemWithHoverProps {
  video: Movie;
}

export default function VideoItemWithHover({ video }: VideoItemWithHoverProps) {
  const configuration = useAppSelector((state) => state.configuration);
  const { setMiniModal, anchorElement } = useMiniModalPortal();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMiniModal(event.currentTarget, video);
  };

  const open = Boolean(anchorElement);

  return (
    <>
      <PaperStyle
        sx={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        // onClick={handlePopoverOpen}
      >
        <Box
          component="img"
          src={`${configuration.images?.base_url}w300${video.backdrop_path}`}
          sx={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            borderRadius: "4px",
          }}
        />
      </PaperStyle>
    </>
  );
}
