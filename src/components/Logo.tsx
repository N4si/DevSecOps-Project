import Box, { BoxProps } from "@mui/material/Box";

export default function Logo({ sx }: BoxProps) {
  return (
    <Box
      component="img"
      alt="Netflix Logo"
      src="/assets/netflix-logo.png"
      width={87}
      height={25}
      sx={{
        ...sx,
      }}
    />
  );
}
