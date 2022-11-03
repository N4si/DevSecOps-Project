import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function MainLoadingScreen() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
}

export default MainLoadingScreen;
