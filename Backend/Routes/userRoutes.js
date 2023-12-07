const express = require("express");
const router = express.Router();
const { signup, login, getUserInfo } = require("../Controllers/userController");
const { verifyToken } = require("../Config/jwt");

// Create User {sign up}
router.post("/signup", signup);

// Login
router.post("/login", login);

//Get User Info with all prev tests
router.get("/getUser/:id", getUserInfo);

module.exports = router;
