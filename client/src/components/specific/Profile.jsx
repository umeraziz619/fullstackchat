import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"This is text"} />
      <ProfileCard heading={"Username"} text={"username"} Icon={<UserNameIcon />} />
      <ProfileCard heading={"Name"} text={"Umer Aziz"} Icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment('2023-11-04T19:00:00.000Z').fromNow()} Icon={<CalendarIcon />} />
    </Stack>
  );
};
const ProfileCard = ({ text, icon, heading, Icon }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography variant="caption" color={"gray"}>
        {heading}
      </Typography>
    </Stack>
  </Stack>
);
export default Profile;
