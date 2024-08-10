import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, Select, MenuItem, InputLabel, Icon } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/users");
      const user = response.data.find(
        (u) => u.userid === userid && u.password === password && u.role === role
      );

      if (user) {
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "student") {
          navigate("/student");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error fetching users", error);
      alert("Error logging in");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {/* main container */}
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "25px",
            boxShadow: "0px 0px 10px #cecece", 
          }}
        >
          {/* icon */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* Title */}
          <Typography component="h1" variant="h5">
            Signin
          </Typography>

          {/* main form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* user id */}
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              type="text"
              label="UserID"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
            />

            {/* password */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >

                      {/* show password */}
                      {showPassword ? (
                        <VisibilityOffIcon color="primary" />
                      ) : (
                        <VisibilityIcon color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* select roll */}
            <FormControl margin="normal" fullWidth>
              <InputLabel>Select Roll</InputLabel>
              <Select
                label="Select Roll"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>
            
            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>

              {/* forgot password */}
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>

              {/* sign up */}
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
                <Link variant="body2" color="primary">
                  Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
