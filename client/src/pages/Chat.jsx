import React, { Fragment, useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../components/styles/StylesComponents";
import { orange } from "../constant/color";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constant/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id:"jdjdjfh",
  name:"Abishek Nahar Singh"
}

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"#f0f1f2"}
        height={"90%"}
        sx={{ overflowx: "hidden", overflowY: "auto" }}
      >
        {
          sampleMessage?.map(i=>(
            <MessageComponent key={i?._id} message={i} user={user}/>
          ))
        }
      </Stack>
      <form action="" style={{ height: "10%" }}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"0.5rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            style={{ position: "absolute", left: "1rem", rotate: "30deg" }}
          >
            <AttachFile />
          </IconButton>
          <InputBox placeholder="Type Message Here..." />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: orange,
              color: "white",
              padding: "0.5rem",
              marginLeft: "1rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </Fragment>
  );
};

export default AppLayout()(Chat);
