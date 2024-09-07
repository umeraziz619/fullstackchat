import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import React, { useState } from "react";
import { VisuallyHiddenInput } from "../components/styles/StylesComponents";
import { useInputValidation, useFileHandler } from "6pp";
import { usernameValidator } from "../utils/validators";
import { bgGradient } from "../constant/color";
const Login = () => {
  const border = {
    // border: "2px solid #000",
  };
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const handleSignup = (e)=>{
    e.preventDefault();
  }
  const handleLogin = (e)=>{
    e.preventDefault();
  }
  return (
    <div style={{backgroundImage:bgGradient}}>
    <Container
      style={border}
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
        {isLogin ? (
          <>
            <Typography variant="h5">Log in</Typography>
            <form onSubmit={handleLogin} style={{ marginTop: "1rem", width: "100%" }}>
              <TextField
                label="Username"
                required
                fullWidth
                variant="outlined"
                margin="normal"
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                label="Password"
                type="password"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
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
              <Typography sx={{ marginTop: "1rem" }} textAlign={"center"}>
                OR
              </Typography>

              <Button
                sx={{ marginTop: "1rem" }}
                variant="text"
                style={{ alignSelf: "center" }}
                onClick={toggleLogin}
                fullWidth
              >
                Sign up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign up</Typography>
            <form onSubmit={handleSignup} style={{ marginTop: "1rem", width: "100%" }}>
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                    borderWidth: 2,
                    borderColor: "black",
                  }}
                  src={avatar.preview}
                />
                {avatar.error && (
                  <Typography m={"1rem"} width={"fit-content"} display={"block"} color="error" variant="caption">
                    {avatar.error}
                  </Typography>
                )}
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    bgcolor: "rgba(255,255,255,0.5)",
                    ":hover": { bgcolor: "rgba(255,255,255,0.7)" },
                  }}
                  component="label"
                >
                  <>
                    <CameraAlt />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>
              <TextField
                label="Name"
                required
                fullWidth
                variant="outlined"
                margin="normal"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                label="Bio"
                required
                fullWidth
                variant="outlined"
                margin="normal"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                label="Username"
                required
                fullWidth
                variant="outlined"
                margin="normal"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}
              <TextField
                label="Password"
                type="password"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
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
              <Typography sx={{ marginTop: "1rem" }} textAlign={"center"}>
                OR
              </Typography>

              <Button
                sx={{ marginTop: "1rem" }}
                variant="text"
                style={{ alignSelf: "center" }}
                onClick={toggleLogin}
                fullWidth
              >
                Login in Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
    </div>
  );
};

export default Login;
