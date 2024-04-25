import { Box, Paper } from "@mui/material";
import AppBar from "../components/AppBar.tsx";
const About = () => {
  return (
    <>
      <AppBar></AppBar>
      <Box
        height={1}
        width={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ pt:4 }}
      >
        <Paper elevation={5} sx={{ width: "50%",  padding: "30px"}}>
          <p>hello</p>
        </Paper>
      </Box>
    </>
  );
};

export default About;
