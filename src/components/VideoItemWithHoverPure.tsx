import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

type VideoItemWithHoverPureType = {
  src: string;
  innerRef: React.ForwardedRef<HTMLDivElement>;
  handleHover: (value: boolean) => void;
};

class VideoItemWithHoverPure extends React.PureComponent<VideoItemWithHoverPureType> {
  render() {
    return (
      <Paper
        ref={this.props.innerRef}
        sx={{
          zIndex: 9,
          cursor: "pointer",
          borderRadius: 0.5,
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
        onMouseEnter={() => {
          this.props.handleHover(true);
        }}
        onMouseLeave={() => {
          this.props.handleHover(false);
        }}
      >
        <Box
          component="img"
          src={this.props.src}
          sx={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            borderRadius: "4px",
          }}
        />
      </Paper>
    );
  }
}

export default React.forwardRef<
  HTMLDivElement,
  Omit<VideoItemWithHoverPureType, "innerRef">
>((props, ref) => <VideoItemWithHoverPure {...props} innerRef={ref} />);
