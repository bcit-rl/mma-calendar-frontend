import { Box, Typography } from "@mui/material";
import * as React from "react";

interface ModalComparisonProps{
    leftValue: string;
    rightValue: string;
    category: string;
}

const ModalComparison = ({leftValue, rightValue, category}: ModalComparisonProps) =>{
    return(
        <Box
            display="flex"
            justifyContent="space-around"
        >
            <Typography>{leftValue}</Typography>          
            <Typography>{category}</Typography>
            <Typography>{rightValue}</Typography>
        </Box>
    );
};

export default ModalComparison