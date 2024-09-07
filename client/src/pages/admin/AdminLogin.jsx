import { useFileHandler, useInputValidation } from "6pp";
import {
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import { bgGradient } from "../../constant/color";
import { Navigate } from "react-router-dom";
const isAdmin = true;
const AdminLogin = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleLogin = () => setIsLogin((prev) => !prev);

  const secretKey = useInputValidation("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  if(isAdmin) return <Navigate to={"/admin/dashboard"}/>

  return (
    <div style={{ backgroundImage: bgGradient }}>
      <Container
        //   style={border}
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            onSubmit={handleLogin}
            style={{ marginTop: "1rem", width: "100%" }}
          >
            <TextField
              label="Secret Key"
              type="password"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              fullWidth
              sx={{ marginTop: "1rem " }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
           
          </form>
        </Paper> 
      </Container>
    </div>
  );
};

export default AdminLogin;
