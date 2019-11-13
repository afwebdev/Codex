const Question = require("../../models/Question");

const askQuestion = (req, resp) => {
  const question = new Question(req.body);
  question.save((err, result) => {
    if (err) {
      console.log(err);
      resp.status(400).json(err);
    }
    resp.json(result);
  });
};

const getQuestion = (req, resp) => {
  Question.find((err, res) => {
    err ? resp.json(err) : resp.json(res);
  });
};

module.exports = { askQuestion, getQuestion };
