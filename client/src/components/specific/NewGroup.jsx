import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleUsers } from "../../constant/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";
const NewGroup = () => {
  const [showGroupModal, setShowGroupModal] = useState(false)
  const groupName = useInputValidation("");
  const [members, setMembers] = useState(sampleUsers );
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  
  const submitHandler = () => {};
  const closehandler = ()=>{}
  return (
    <Dialog open onClose={closehandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>New Group</DialogTitle>

        <TextField
          label="group"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography>Members</Typography>
        <Stack>
          {members?.map((item, index) => (
            <UserItem
              user={item}
              key={item?._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(item._id)}
              // handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
          <Button variant="text" color="error" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
