const express = require("express");
const router = express.Router();

const db = require("../../models");

const passport = require("../../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../../config/middleware/isAuthenticated");

// Route=>		~/api/data
//isAuthenticated routes to root ( ~/ )on fail
router.get("/", (req, resp) => {
  // console.log(req);
  console.log(req.user);
  resp.send("test");
});

// Ideally these would all come from the state. Hardcoded for testing purposes
//M.T Testing the user creation route. This will occur when a user signs up, and should populate MongoDB
router.post("/newUser", function(req, res) {
  var User = {
    name: "Manjyot",
    email: "manjyot@gmail.com",
    password: "Test",
    country: "Canada"
  };
  db.User.create(User)
    .then(function(dbUser) {
      res.json(dbUser);
      return console.log(dbUser);
    })
    .catch(function(err) {
      console.log(err);
    });
});

// M.T Testing the Adding Question Route. Don't need to include user_id
// etc, those will be pushed in from other routes
router.post("/newQuestion", function(req, res) {
  var Question = {
    question: "How do I rip this?",
    dex: 25,
    language: "Java",
    expiry_time: 2019 - 06 - 11
  };
  db.Question.create(Question)
    .then(function(dbQuestion) {
      res.json(dbQuestion);
      return console.log(dbQuestion);
    })
    .catch(function(err) {
      console.log(err);
    });
});

// MT Testing the Answer Route. This will also update the questions collection
// by pushing into answer array
router.post("/newAnswer", function(req, res) {
  var Answer = {
    answer: "This is how you rip this",
    rating: 5,
    isRejected: false,
    // This user id would be stored in the request.
    user_id: "5dc866e4fea81dde3828b208"
  };
  db.Answer.create(Answer)
    .then(function(dbAnswer) {
      res.json(dbAnswer);
      return console.log(dbAnswer);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
