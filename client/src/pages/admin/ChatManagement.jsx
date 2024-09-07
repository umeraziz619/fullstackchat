import React, { useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { useState } from "react";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../constant/sampleData";
import { transformImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard style={{position:'absolute',top:0}} max={100}  avatar={params?.row?.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarCard alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params?.row?.creator?.name}</span>
      </Stack>
    ),
  },
];
// const columns = [];
const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData?.chats?.map((i) => ({
        ...i,
        id: i._id,
        avatar: i.avatar.map((i)=>transformImage(i,50)),
        members:i.members.map((i)=>transformImage(i.avatar,50)),
        creator: {
          name:i.creator.name,
          avatar:transformImage(i.creator.avatar,50)
        }
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table heading="All Chats" rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default ChatManagement;
