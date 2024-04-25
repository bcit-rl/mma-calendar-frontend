import { Container, Typography } from "@mui/material";
import AppBar from "../components/AppBar.tsx";
const About = () => {
  return (
    <>
      <AppBar></AppBar>
      <Container maxWidth="xl" sx={{ pt:5 }}>
        <Typography variant="h4">
          About
        </Typography>
        <Typography variant="body1" sx={{ mt:2 }}>
          This is a simple web app that displays upcoming and past UFC fights
          for the current year. The goal of making this app was to emulate the result you get when you 
          search "UFC this weekend" on Google. The app is built using React and Material-UI for the frontend
          and .Net for the backend.
        </Typography>
      </Container>
    </>
  );
};

export default About;
