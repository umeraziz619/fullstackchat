import {
  Add,
  DeleteOutline,
  Done,
  Edit,
  KeyboardBackspace,
  Menu,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StylesComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constant/sampleData";
import UserItem from "../components/shared/UserItem";
const ConfirmDeleteDialogCom = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const isAddMember = false;
const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setconfirmDeleteDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const navigateBack = () => {
    navigate("/");
  };
  const handlemobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handlemobileClose = () => {
    setIsMobileMenuOpen(false);
  };
  const updateGroupName = () => {
    setIsEdit(false);
  };
  const openConfirmDeletehndler = () => {
    setconfirmDeleteDialog(true);
  };
  const closeConfirmDeletehndler = () => {
    setconfirmDeleteDialog(false);
  };
  const deleteHandler = () => {
    closeConfirmDeletehndler();
  };
  const openAddMemberHandler = () => {};
  const removeMemberHandler = (id) => {
    console.log("Remove Member ID", id);
  };

  useEffect(() => {
    if(chatId){
      setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const GroupName = (
    <Stack
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
      direction={"row"}
      alignItems={"center"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      spacing={"1rem"}
      p={{ xs: "0", sm: "1rem", md: "1rem 4rem" }}
    >
      <Button
        size="large"
        color="error"
        variant="outlined"
        startIcon={<DeleteOutline />}
        onClick={openConfirmDeletehndler}
      >
        Delete Group
      </Button>
      <Button
        onClick={openAddMemberHandler}
        size="large"
        variant="contained"
        startIcon={<Add />}
      >
        Add Member
      </Button>
    </Stack>
  );

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handlemobile}>
          <Menu />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          onClick={navigateBack}
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );
  return (
    <Grid height={"100vh"} container>
      <Grid
        item
        bgcolor={"bisque"}
        sx={{ display: { xs: "none", sm: "block" } }}
        sm={4}
      >
        <GroupList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}

            <Typography margin={"2rem"} alignSelf={"center"} variant="body1">
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              // bgcolor={"bisque"}
              height={"50vh"}
              overflow={"auto"}
            >
              {sampleUsers?.map((i) => (
                <UserItem
                  key={i._id}
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  user={i}
                  isAdded
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialogCom
            open={confirmDeleteDialog}
            handlerClose={closeConfirmDeletehndler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handlemobileClose}
      >
        <GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups?.map((group) => (
        <GroupListItem key={group._id} group={group} chatId={chatId} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link to={`?group=${_id}`}>
      <Stack
        direction="row"
        spacing={"1rem"}
        alignItems={"center"}
        onClick={(e) => {
          if (chatId == _id) {
            e.preventDefault();
          }
        }}
      >
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
