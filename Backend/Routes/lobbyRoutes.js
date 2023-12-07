const express = require("express");
const router = express.Router();
const { joinLobby, createLobby, getPublicLobbies, getLobby, expireLobby } = require("../Controllers/lobbyController");
const { verifyToken } = require("../Config/jwt");

// Create session
router.post("/create", createLobby);

// Join session with session code
router.post("/join", joinLobby);

router.get("/getPublicLobbies", getPublicLobbies);

router.get("/getLobby/:id", getLobby);

// router.get('/expireLobby/:id', expireLobby);

module.exports = router;
