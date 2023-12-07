const express = require("express");
const { leaderBoard, newScore } = require("../Controllers/scoreController");
const { verifyToken,isAuth } = require("../Config/jwt");

const router = express.Router();

router.get("/leaderBoard", leaderBoard);

//  user must be logged in
router.post("/newScore", verifyToken, newScore);

module.exports = router;
