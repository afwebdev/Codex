const express = require("express");
const router = express.Router();

const db = require("../../models");

const passport = require("../../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../../config/middleware/isAuthenticated");

// Route=>		~/api/data
//isAuthenticated routes to root ( ~/ ) fail
router.get("/", isAuthenticated, (req, resp) => {
  console.log(req.user);
  resp.send("test");
});

module.exports = router;
