const express = require("express");
const { askQuestion, getQuestion, getQuestionByID } = require("../controllers/questions");

const { requireSignin } = require("../controllers/auth");

const router = express.Router();

// Post a question
router.route("/api/questions").post(askQuestion);

// Get questions that are not flagged as picked up
router.route("/api/questions/").get(getQuestion);

//Gets question that you click on and all associated answers
router.route("/api/question/:_id").get(getQuestionByID);

module.exports = router;
