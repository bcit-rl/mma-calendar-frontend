import AppBar from "../components/AppBar.tsx";
import { Box } from "@mui/material";
import App from "../App.tsx";

const Root = () => {
  return (
    <>
      <AppBar></AppBar>
      <Box
        height={1}
        width={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <App />
      </Box>
    </>
  );
};

export default Root;
