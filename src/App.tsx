import Box from "@mui/material/Box";
import MainRoutes from "routes";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: "primary.main",
        position: "relative",
      }}
    >
      <MainRoutes />
    </Box>
  );
}

export default App;
