import React from "react";
import Header from "./Header";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constant/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
const AppLayout = () => (WrappedComponent) => {
  
  return (props) => {
    const params = useParams();
  const chatId = params?.chatId;
  console.log("chatId is =======>",chatId);

  const handleDeleteChat = (e,_id,groupChat)=>{
    e.preventDefault();
    console.log("Group Chat",_id,groupChat)
  }
    return (
      <>
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            height={"100%"}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              newMessagesAlert={[{chatId, count: 4 }]}
              onlineUsers={["1","2"]}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            item
            md={5}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile />
          </Grid>
        </Grid>
        <div>F</div>
      </>
    );
  };
};

export default AppLayout;
