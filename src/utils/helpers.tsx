import { ReactNode } from "react";
import Fight from "../components/Fight";
import FighterAvatar from "../components/FighterAvatar";
import FighterInfo from "../components/FighterInfo";
import FightModal from "../components/FightModal";
import { IEventData, IFight, IFighter } from "./Interfaces";
import { BASEURL } from "./global_constants";
import ModalComparison from "../components/ModalComparison";
import { Box, Divider, Typography } from "@mui/material";
import FightRecordTable from "../components/FightRecordTable";
const FIGHT_URL = BASEURL + "api/Fight";

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function createFighterInfo(fighterData: IFighter, imageSide: string) {
  return (
    <FighterInfo
      image={
        <FighterAvatar
          src={`${fighterData.headshot}`}
          Winner={fighterData.winner ? fighterData.winner : false}
        />
      }
      imageSide={imageSide}
      fighterName={`${fighterData.firstName} ${fighterData.lastName}`}
      fighterRecord={`${nullToValue(fighterData.wins, 0)} - ${nullToValue(
        fighterData.losses,
        0
      )} - 
      ${nullToValue(fighterData.draws, 0)} - ${nullToValue(
        fighterData.noContests,
        0
      )}`}
    />
  );
}

/**
 * Funciton to handle output of null values. If the value is null, it will return the outputValue otherwise
 * it will returnt he checkedValue
 *
 * @param checkedValue value to be checked
 * @param outputValue value to be returned in case of null
 * @returns checkedValue if not null, outputValue if null
 */
export function nullToValue(checkedValue: unknown, outputValue: unknown) {
  return checkedValue == null ? outputValue : checkedValue;
}

/**
 * Converts a Date Object into a string value with the format being in the format
 * "Day Month Date, Time" with time being converted to local time.
 *
 * I.e "Sat May 11, 4:00 p.M."
 *
 * @param date Date object to be converted to a string
 * @returns Date as a string
 *
 *
 */
export function createDateString(date: Date) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const hours = date.getHours() % 12 == 0 ? 12 : date.getHours() % 12;
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const timeString =
    date.getHours() >= 12
      ? `${hours}:${minutes} p.M.`
      : `${hours}:${minutes} a.M.`;

  return `${daysOfWeek[date.getDay()]} ${
    monthAbbreviations[date.getMonth()]
  } ${date.getDate()}, ${timeString}`;
}

/**
 * Given fightData creates a Fight Component and wraps it in a fight Modal
 *
 * @param fightData
 * @returns Fight component with data filled out
 */
export function createFight(fightData: IFight) {
  const leftFighterData: IFighter = fightData.fighterA;
  const rightFighterData: IFighter = fightData.fighterB;
  const leftFighter: ReactNode = createFighterInfo(leftFighterData, "L");
  const rightFighter: ReactNode = createFighterInfo(rightFighterData, "R");
  const componentKey: string = `${fightData.fighterA.fighterId}-${fightData.fighterB.fighterId}`;
  const fight: ReactNode = (
    <Fight
      key={componentKey}
      date={`${fightData.date}Z`}
      weightClass={`${fightData.weightClass}`}
      leftFighter={leftFighter}
      rightFighter={rightFighter}
      description={
        fightData.method
          ? `${fightData.method} ${
              fightData.methodDescription
                ? "- " + fightData.methodDescription
                : ""
            } :  R${fightData.round} - ${fightData.displayClock} `
          : ""
      }
    />
  );

  return (
    <FightModal key={`modal-${componentKey}`} clickable={fight}>
      {fight}
      <Divider></Divider>
      <ModalComparison
        key="age-category"
        leftValue={`${leftFighterData.age}`}
        rightValue={`${rightFighterData.age}`}
        category={"Age"}
      />
      <ModalComparison
        key="weight-category"
        leftValue={`${leftFighterData.weight}`}
        rightValue={`${rightFighterData.weight}`}
        category={`Weight`}
      />
      <ModalComparison
        key="height-category"
        leftValue={`${leftFighterData.height}`}
        rightValue={`${rightFighterData.height}`}
        category={`Height`}
      />
      <Divider />
      <Box height={0.6} sx={{ display: { xs: "flex", sm: "flex", md: "None" }, justifyContent: "space-around", flexDirection:"row"}}>
        <Box display="flex" flexDirection="column" width={0.45}>
          <FightRecordTable FighterId={`${leftFighterData.fighterId}`} />
        </Box>
        <Divider orientation="vertical" sx={{ mx: 1 }} />
        <Box display="flex" flexDirection={"column"} width={0.45}>
          <FightRecordTable FighterId={`${rightFighterData.fighterId}`} />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        height={0.6}
        sx={{ display: { xs: "None", sm: "None" ,md:"flex"} }}
      >
        <Box display="flex" alignItems="center" flexDirection="column" >
          <Typography variant="body1">
            {" "}
            {`${leftFighterData.firstName} ${leftFighterData.lastName}`}
          </Typography>
        </Box>
        <FightRecordTable FighterId={`${leftFighterData.fighterId}`} />
        <Box display="flex" alignItems="center" flexDirection={"column"}>
          <Typography variant="body1">
            {" "}
            {`${rightFighterData.firstName} ${rightFighterData.lastName}`}
          </Typography>
        </Box>
        <FightRecordTable FighterId={`${rightFighterData.fighterId}`} />
      </Box>
    </FightModal>
  );
}

/**
 * Creates the list of fights to be put in an event. The data is obtained through a GET request
 * from the requested URL. The list of fights is a 2d array structured like so
 *
 * [[Main Card Fights], [Prelim Card Fights], [Early Prelim fights]]
 *
 * If there are no prelim/early prelim fights, they will not be added. Inside the arrays
 * are Fight components
 *
 * @param EventUrl URL to the API that has the data
 * @returns 2d array where the inner arrays are ReactNode[]
 */
export async function createFightList(EventUrl: string) {
  const EventData = await fetch(EventUrl).then((res) => res.json());
  const fightList: ReactNode[] = [];
  const mainCard: ReactNode[] = [];
  const prelims: ReactNode[] = [];
  const earlyPrelims: ReactNode[] = [];
  for (const fightData of EventData.fights) {
    const fightDataResponse = await fetch(FIGHT_URL + `/${fightData.fightId}`);
    const fightJSONData = await fightDataResponse.json();
    
    const fight = await createFight(fightJSONData);
    if (fightJSONData.cardSegment == "Main Card") {
      mainCard.push(fight);
      mainCard.push(<Divider key={`Divider-${fightJSONData.fightId}`} />);
    }
    if (fightJSONData.cardSegment == "Prelims") {
      prelims.push(fight);
      prelims.push(<Divider key={`Divider-${fightJSONData.fightId}`} />);
    }
    if (fightJSONData.cardSegment == "Early Prelims") {
      earlyPrelims.push(fight);
      earlyPrelims.push(<Divider key={`Divider-${fightJSONData.fightId}`} />);
    }
  }

  if (mainCard.length > 0) {
    fightList.push(mainCard);
  }

  if (prelims.length > 0) {
    fightList.push(prelims);
  }
  if (earlyPrelims.length > 0) {
    fightList.push(earlyPrelims);
  }
  return fightList;
}

/**
 * Binary search algo for finding the date in the array that is closest to today's date
 * @param nums
 * @param target
 * @returns Number that is the index in nums where the closest date is.
 */
export function binarySearch(nums: IEventData[], target: Date): number {
  let left: number = 0;
  let right: number = nums.length - 1;
  let mid: number = 0;
  target.setHours(0, 0, 0, 0);
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    const midDate = new Date(nums[mid].eventDate);
    midDate.setHours(0, 0, 0, 0);
    if (midDate === target) return mid;
    if (target < midDate) right = mid - 1;
    else left = mid + 1;
  }

  return mid;
}
