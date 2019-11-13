const express = require("express");
const { askQuestion, getQuestion } = require("../controllers/questions");

const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.route("/api/questions").post(askQuestion);
router.route("/api/questions").get(getQuestion);

module.exports = router;
