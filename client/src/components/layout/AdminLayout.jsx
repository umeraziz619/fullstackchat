import {
  Close,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ManageAccounts,
  Group as GroupIcon,
  Message as MessageIcon,
  ExitToApp,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2 rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTab = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "User",
    path: "/admin/users",
    icon: <ManageAccounts />,
  },
  {
    name: "Chat",
    path: "/admin/chats",
    icon: <GroupIcon />,
  },
  {
    name: "Message",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];
const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();

  const handleLogOut = ()=>{

  }
  return (
    <Stack width={w} direction={"column"} p={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Admin
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTab?.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "black",
                color: "white",
                "&:hover": { color: "gray" },
              }
            }
          >
            <Stack direction={"row"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link
        onClick={handleLogOut}
        >
          <Stack direction={"row"} spacing={"1rem"}>
            <ExitToApp />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};


const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const handleClose = () => {
    setIsMobile(false);
  };
  if(!isAdmin){
    return <Navigate to="/admin"/>
  }
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <Close /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9} lg={9} bgcolor="#f6f6f6">
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
