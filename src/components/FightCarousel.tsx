import { CircularProgress, Box, Tab, Tabs, useTheme } from "@mui/material";
import FightTabPanel from "./FightTabPanel";
import { a11yProps, createFightList } from "../utils/helpers";
import { useState, useEffect, ReactNode, SyntheticEvent } from "react";
import SwipeableViews from "react-swipeable-views-react-18-babel-version-fix";
interface FightCarouselProps {
  URL: string;
}

const cache: { [key: string]: ReactNode[] } = {};

const FightCarousel = (props: FightCarouselProps) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const [fightsList, setFights] = useState<ReactNode[]>([]);
  const tabLists: ReactNode[] = [];
  const tabPanel: ReactNode[] = [];

  const cardSegments: readonly [string, string, string] = [
    "Main Card",
    "Prelims",
    "Early Prelims",
  ];

  useEffect(() => {
    const FillFightData = async () => {
      if (cache[props.URL]) {
        setFights(cache[props.URL]);
        return;
      }

      const fight_list = await createFightList(props.URL);
      const tempFightList: ReactNode[] = [];
      if (fight_list) {
        for (let i = 0; i < fight_list.length; i++) {
          tempFightList.push(fight_list[i]);
        }
        setFights(tempFightList);
      }
      cache[props.URL] = tempFightList;
    };
    FillFightData();
  }, []);

  for (let i = 0; i < fightsList.length; i++) {
    tabLists.push(
      <Tab key={`CarouselTab-${i}`} label={cardSegments[i]} {...a11yProps(i)} />
    );
    tabPanel.push(
      <FightTabPanel key={`CarouselTabPanel-${i}`} value={value} index={i}>
        {fightsList[i]}
      </FightTabPanel>
    );
  }

  return (
    <>
      {fightsList.length != 0 ? (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="basic tabs example"
            >
              {tabLists}
            </Tabs>
          </Box>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
            containerStyle={{
              transition: "transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s",
            }}
          >
            {tabPanel}
          </SwipeableViews>
        </>
      ) : (
        <Box
          height={1}
          width={1}
          my="45vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{
            overflow: "hidden",
            overflowY: "hidden", // added scroll
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default FightCarousel;
