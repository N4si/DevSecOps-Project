import { forwardRef } from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

const NetflixIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, sx, ...others }, ref) => {
    return (
      <IconButton
        sx={{
          p: 0.5,
          color: "white",
          borderRadius: "50%",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "grey.700",
          "&:hover, &:focus": {
            borderColor: "grey.200",
          },
          ...sx,
        }}
        {...others}
        ref={ref}
      >
        {children}
      </IconButton>
    );
  }
);

export default NetflixIconButton;
