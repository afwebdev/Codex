const express = require("express");
const router = express.Router();

const passport = require("../../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../../config/middleware/isAuthenticated");

router.get("/", isAuthenticated, (req, resp) => {
  resp.send("success");
});

module.exports = router;
