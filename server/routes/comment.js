const express = require("express");
const router = express.Router();
const {postReply} = require("../controllers/comment");

const { requireSignin } = require("../controllers/auth");

// Post a comment to a specific answer
router.route("/api/comment").post(postReply);

module.exports = router;