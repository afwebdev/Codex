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
  console.log("REQ.QUERY", req.query);
  const category = req.query.category;

  if (category) {
    //Send back questions relating to category selected.
    Question.find({ category, is_pickedup: false }, (err, res) => {
      err ? resp.json(err) : resp.json(res);
    });
  } else {
    Question.find({ is_pickedup: false }, (err, res) => {
      //Send all questions back(not category selected)
      resp.json(res);
    });
  }
};

module.exports = { askQuestion, getQuestion };
