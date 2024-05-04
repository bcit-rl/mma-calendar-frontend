import { Avatar, Badge, Box } from "@mui/material";
interface FighterAvatarProps {
  src: string;
  Winner: boolean;
}

const FighterAvatar = (props: FighterAvatarProps) => {
  return (
    <>
      <Avatar
        src={props.src}
        sx={{
          width: 55,
          height: 55,
          border: 2,
          margin: "0px 5px 0px",
          borderColor: props.Winner ? "Green" : "#efeff0",
        }}
      />

      {props.Winner ? (
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          overlap="circular"
          color="success"
          badgeContent={
            <Box>
              <div className="check" />
            </Box>
          }
          sx={{
            transform: "translate(-10px, 20px)",
            "& .MuiBadge-badge": { height: 18, minWidth: 18 },
          }}
        ></Badge>
      ) : (
        ""
      )}
    </>
  );
};

export default FighterAvatar;
