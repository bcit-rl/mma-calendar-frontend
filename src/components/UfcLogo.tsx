import React from "react";
import Logo from "../../public/UFC_logo.svg";
import { Box } from "@mui/material";

const UfcLogo = () => {
  return (
    <Box
    sx={{
      my: 2,
      mx: 4, 
      filter: "invert(14%) sepia(45%) saturate(6675%) hue-rotate(345deg) brightness(99%) contrast(93%)"}}>
      <img src={Logo}  height={50} />
    </Box>
  );
};

export default UfcLogo;
