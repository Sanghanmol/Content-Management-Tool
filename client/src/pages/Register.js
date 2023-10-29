import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
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
      const { data } = await axios.post("/api/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
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
          marginTop={10}
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
            Register
          </Typography>
          <TextField
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
            sx={{
              backgroundColor: "white",
              width: "70%",
              borderRadius: 1,
            }}
          />
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
            sx={{ backgroundColor: "white", width: "70%", borderRadius: 3 }}
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
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            <Typography sx={{ color: "white" }}>
              Already Registered ,
            </Typography>{" "}
            <Link
              href="/login"
              sx={{
                paddingLeft: 1,
                color: "#46286A",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Login!
            </Link>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
