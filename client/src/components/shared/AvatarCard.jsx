import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/features";
// Todo Transform
const AvatarCard = ({ avatar = [], max = 4 ,style={}}) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup max={max}>
        <Box width={"5rem"}>
          {avatar?.map((i, index) => (
            <Avatar key={Math.random() * 1000}
            src={transformImage(i)}
            alt={`Avatar ${index}`}
            sx={{
              width:"3rem",
              height:"3rem",
              ...style
            }} />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
