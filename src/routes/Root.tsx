import AppBar from "../components/AppBar.tsx";
import { Box, Divider, Paper } from "@mui/material";
import App from "../App.tsx";
import UfcLogo from "../components/UfcLogo.tsx";

const Root = () => {
  return (
    <>
      <AppBar />
      <Box
        height={1}
        width={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={2}
        marginBottom={8}
      >
        <Box sx={{ minWidth: 350, maxWidth: 800, mx: 10 }}>
          <Paper elevation={4}>
            <Box
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ backgroundColor: "#131217", borderRadius: "4px 4px 0 0 " }}
            >
              <UfcLogo/>
            </Box>
            <Divider />
            <App />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Root;
