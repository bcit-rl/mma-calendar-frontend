import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Box } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Box 
      height={1}
      width={1}
      display="flex"
      alignItems="center"
      justifyContent="center">
      <App />
    </Box>
  </React.StrictMode>
);
