import { motion } from "framer-motion";
import Box, { BoxProps } from "@mui/material/Box";
import { varWrapEnter } from "./variants/Wrap";

interface MotionContainerProps extends BoxProps {
  initial?: boolean | string;
  open?: boolean;
}

export default function MotionContainer({
  open,
  children,
  ...other
}: MotionContainerProps) {
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? "animate" : "exit"}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
}
