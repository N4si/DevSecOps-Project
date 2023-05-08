import CircularProgress from "@mui/material/CircularProgress";

function MainLoadingScreen() {
  return (
    <div
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <CircularProgress sx={{ color: "white", zIndex: 10 }} />
    </div>
  );
}

export default MainLoadingScreen;
