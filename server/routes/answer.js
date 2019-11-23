const express = require("express");
const router = express.Router();
const {getAnsweredQuestions, postAnswer,upVoteAnswer} = require("../controllers/answer");

const { requireSignin } = require("../controllers/auth");

// Post an answer to a specific question
router.route("/api/answers").post(postAnswer);

// Upvote an answer
router.route("/api/answers/upvote").post(upVoteAnswer);

// Get all answered questions for a specific user
router.route("/api/answers").get(getAnsweredQuestions);

module.exports = router;