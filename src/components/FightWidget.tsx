import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { ReactNode, useState, SyntheticEvent } from "react";
import { IEventData } from "../utils/Interfaces";
import { a11yProps, binarySearch } from "../utils/helpers";
import FightWidgetTabPanel from "./FightWidgetTabPanel";
import SwipeableViews from "react-swipeable-views-react-18-babel-version-fix";

interface FightWidgetProps {
  carouselArray?: Array<ReactNode>;
  eventData: Array<IEventData>;
}

const FightWidget = (props: FightWidgetProps) => {
  const theme = useTheme();
  const [value, setValue] = useState(binarySearch(props.eventData, new Date()));
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const tabList: Array<ReactNode> = [];
  const tabPanels: Array<ReactNode> = [];

  if (props.carouselArray && props.eventData) {
    for (let i = 0; i < props.carouselArray.length; i++) {
      tabList.push(
        <Tab
          key={`FightWidgetTab-${i}`}
          label={props.eventData[i].eventName}
          {...a11yProps(i)}
        />
      );
      tabPanels.push(
        <FightWidgetTabPanel
          key={`FightWidgetTabPanel-${i}`}
          value={value}
          index={i}
        >
          {props.carouselArray[i]}
        </FightWidgetTabPanel>
      );
    }
  }

  return (
    <>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          aria-label="basic tabs example"
        >
          {tabList}
        </Tabs>
      </Box>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        containerStyle={{
          transition: "transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s",
        }}
      >
        
        {tabPanels}
      </SwipeableViews>

    </>
  );
};

export default FightWidget;
