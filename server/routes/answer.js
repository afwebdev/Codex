const express = require("express");
const router = express.Router();
const {
  getAnsweredQuestions,
  postAnswer,
  upVoteAnswer,
  flipAnswerFlag
} = require("../controllers/answer");

const { requireSignin } = require("../controllers/auth");

// Post an answer to a specific question
router.route("/api/answers").post(postAnswer);

// Upvote an answer
router.route("/api/answers/upvote").post(upVoteAnswer);

// // Get all answers for a specific user
// router.route("/api/answers").get(getAnsweredQuestions);

//Get all answered QUESTIONS for a specified user
router.route("/api/answers/user/:user_id").get(getAnsweredQuestions);

// Flip the flag
router.route("/api/answer/changeFlag").put(flipAnswerFlag)

module.exports = router;
