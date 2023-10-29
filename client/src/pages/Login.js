import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={15}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
          backgroundColor="black"
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase", color: "#46286A" }}
            padding={3}
            textAlign="center"
            fontWeight={600}
          >
            Login
          </Typography>

          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
            sx={{ backgroundColor: "white", width: "70%", borderRadius: 3 }}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
            sx={{
              backgroundColor: "white",
              width: "70%",
              borderRadius: 3,
            }}
          />

          <Button
            type="submit"
            sx={{
              borderRadius: 3,
              marginTop: 3,
              backgroundColor: "#46286A",
              fontSize: 17,
              width: "30%",
            }}
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            <Typography sx={{ color: "white" }}> Not a user ,</Typography>{" "}
            <Link
              href="/register"
              sx={{
                paddingLeft: 1,
                color: "#46286A",
                fontSize: 15,
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Register!
            </Link>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
