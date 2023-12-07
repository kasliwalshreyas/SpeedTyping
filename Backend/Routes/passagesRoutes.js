const express = require("express");
const { getShortParagraph, getMediumParagraph, getLongParagraph, getEasyMode, getMediumMode } = require("../Controllers/passagesController");
const { verifyToken } = require("../Config/jwt");

const router = express.Router();


// No of sentences 4
router.get("/getShortParagraph/", getShortParagraph);

// No of sentences 8
router.get("/getMediumParagraph", getMediumParagraph);

// No of sentences 12
router.get("/getLongParagraph", getLongParagraph);

// Easy Mode
router.get("/getEasyMode", getEasyMode);

// Medium Mode
router.get("/getMediumMode", getMediumMode);

// Hard Mode {medium size paragraph with punctuations and upper Case }
router.get("/getHardMode", getMediumParagraph);

module.exports = router;