import { Box, Container, Typography } from "@mui/material";
import { ReactNode } from "react";
import { createDateString } from "../utils/helpers";

interface Props {
  leftFighter: ReactNode;
  rightFighter: ReactNode;
  date: string;
  weightClass: string;
  description?: string;
}

const Fight = ({
  leftFighter,
  rightFighter,
  date,
  weightClass,
  description,
}: Props) => {
  const dateInstance = new Date(date)

  return (
    <Container>
      <Box>
        <Typography variant="subtitle2">{`${createDateString(dateInstance)}`}</Typography>
        <Typography variant="subtitle1">{weightClass}</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        {leftFighter}
        {rightFighter}
      </Box>
      {description && (
        <Typography variant="subtitle1" color="green">
          {description}
        </Typography>
      )}
    </Container>
  );
};

export default Fight;
