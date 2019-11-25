const express = require("express");
const router = express.Router();
const {
  askQuestion,
  getQuestion,
  getQuestionByID,
  getQuestionByUser
} = require("../controllers/questions");

const { requireSignin } = require("../controllers/auth");


// Post a question
router.route("/api/questions").post(askQuestion);

// Get questions that are not flagged as picked up
router.route("/api/questions/").get(getQuestion);

//Gets question that you click on and all associated answers
router.route("/api/question/:_id").get(getQuestionByID);

//Get questions created by User.
router.route("/api/questions/:user").get(getQuestionByUser);

module.exports = router;
