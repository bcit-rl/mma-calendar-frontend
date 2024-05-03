import { Container, Typography } from "@mui/material";
import AppBar from "../components/AppBar.tsx";

const About = () => {

  return (
    <>
      <AppBar></AppBar>
      <Container maxWidth="xl" sx={{ pt: 5 }}>
        <Typography variant="h4">About</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This is a simple web app that displays upcoming and past UFC fights
          for the current year. The goal this app is to emulate the result you
          get when you search "UFC this weekend" on Google. The app is built
          using React and Material-UI for the frontend and .Net for the backend.
          The reason this app was made was for me to get practice developing a
          full stack application and has nothing to do with the UFC.
        </Typography>
        <Typography variant="h4" sx={{ mt: 5 }}>
          Features
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          The app displays the upcoming and past UFC fights for the current
          year. The fights are displayed in a card format and are sorted by
          date. Results are fetched once every 24 hours, so the app may not be
          up to date with the latest results or scheduled fights.
        </Typography>
      </Container>
    </>
  );
};

export default About;
