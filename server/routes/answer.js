const express = require("express");
const router = express.Router();
const {getAnsweredQuestions, postAnswer,upVoteAnswer} = require("../controllers/answer");

const { requireSignin } = require("../controllers/auth");


router.route("/api/answers").post(postAnswer);
router.route("/api/answers/upvote").post(upVoteAnswer);
router.route("/api/answers").get(getAnsweredQuestions);

module.exports = router;