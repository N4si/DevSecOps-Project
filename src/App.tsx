import { RouterProvider } from "react-router-dom";
import Box from "@mui/material/Box";
// import MainRoutes from "src/routes";
import router from "src/routes";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      {/* <MainRoutes /> */}
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
