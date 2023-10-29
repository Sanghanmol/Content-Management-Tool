import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    url: "",
  });
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        url: inputs.url,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={500}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={8}
          boxShadow="10px 10px 20px #ccc"
          padding={2}
          borderRadius={5}
          backgroundColor="black"
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            padding={2}
            color="#46286A"
          >
            CREATE BLOG
          </Typography>
          <InputLabel
            sx={{ fontSize: "24px", fontWeight: "bold", color: "white" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ backgroundColor: "white", width: "80%", borderRadius: 3 }}
          />
          <InputLabel
            sx={{ fontSize: "24px", fontWeight: "bold", color: "white" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ backgroundColor: "white", width: "80%", borderRadius: 3 }}
          />
          <InputLabel
            sx={{ fontSize: "24px", fontWeight: "bold", color: "white" }}
          >
            URL
          </InputLabel>
          <TextField
            name="url"
            value={inputs.url}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ backgroundColor: "white", width: "80%", borderRadius: 3 }}
          />
          <Button
            type="submit"
            sx={{
              borderRadius: 3,
              marginTop: 3,
              backgroundColor: "#46286A",
              fontSize: 17,
              width: "30%",
              marginBottom: 2,
            }}
            variant="contained"
            color="secondary"
          >
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
