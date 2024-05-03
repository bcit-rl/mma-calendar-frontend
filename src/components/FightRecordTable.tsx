import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { BASEURL } from "../utils/global_constants";
import { IFightRecord } from "../utils/Interfaces";

const cache: { [key: string]: IFightRecord[] } = {};

interface FightRecordTableProps {
  FighterId: string;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c31d2b",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * Converts a string date into
 */
const stringDateToMDY = (dateString: string) => {
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
  const date = new Date(dateString);

  return `${
    monthAbbreviations[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

const FightRecordTable = (props: FightRecordTableProps) => {
  const [FightHistory, setFightHistory] = useState<IFightRecord[]>([]);
  const resultColours: Map<string, string> = new Map([
    ["W", "#bbffdd"],
    ["D", "#ccddee"],
    ["L", "#ffe3e3"],
  ]);
  useEffect(() => {
    const FillFightData = async () => {
      if (cache[props.FighterId]) {
        setFightHistory(cache[props.FighterId]);
        return;
      }

      const fight_list = await fetch(
        BASEURL + "api/FightHistory/" + props.FighterId
      ).then((res) => res.json());
      setFightHistory(fight_list);
      cache[props.FighterId] = fight_list;
    };
    FillFightData();
  }, []);

  return (
    <Paper sx={{ overflowY:"auto", height:1 }}>
      <TableContainer sx={{ overflowX:"initial" }}>
        <Table size="small" aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Res.</StyledTableCell>
              <StyledTableCell align="center">Opponent</StyledTableCell>
              <StyledTableCell align="center">Method</StyledTableCell>
              <StyledTableCell align="center">Event</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Round</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FightHistory &&
              FightHistory.map((row: IFightRecord) => (
                <StyledTableRow
                  key={`${row.opponent}-${row.date}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{
                      backgroundColor: `${
                        resultColours.has(row.result)
                          ? resultColours.get(row.result)
                          : "grey"
                      }`,
                    }}
                  >
                    {row.result}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.opponent}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.method}</StyledTableCell>
                  <StyledTableCell align="center">{row.event}</StyledTableCell>
                  <StyledTableCell align="center">{`${stringDateToMDY(
                    row.date
                  )}`}</StyledTableCell>
                  <StyledTableCell align="center">{row.round}</StyledTableCell>
                  <StyledTableCell align="center">{row.time}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FightRecordTable;
