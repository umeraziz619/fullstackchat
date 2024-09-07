import React, { useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { dashboardData } from "../../constant/sampleData";
import { transformImage } from "../../lib/features";
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
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    headerClassName: "table-header",
    width: 200,
  },
];
// const columns = [];
const UserManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData?.users?.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 500),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table heading="All Users" rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default UserManagement;
