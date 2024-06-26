import { Box } from "@mui/material";
import {ReactNode} from "react";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const FightTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
};
export default FightTabPanel;
