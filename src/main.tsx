import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./routes/About.tsx";
import Root from "./routes/Root.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#c31d2b'
    },
    success: {
      main: '#008000'
    }
    // secondary: {
    //   main: '#E33E7F'
    // }
  },
  breakpoints:{
    values:{
      xs: 0,
      sm: 500,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path:"/about",
    element: <About/>,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider  theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
