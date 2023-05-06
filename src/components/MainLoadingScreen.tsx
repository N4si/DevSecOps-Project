import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function MainLoadingScreen() {
  return (
    <Box
      flexGrow={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
}

export default MainLoadingScreen;
