const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userContoller");

//router object
const router = express.Router();

// GET ALL USERS
router.get("/all-users", getAllUsers);

// CREATE USER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

module.exports = router;
