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
  //WHY CANT I GET THE DAMN REQ.BODY!
  const category = req.query.category;
  // console.log(req.body);
  console.log("WHY IS THIS CAT UNDEFINED FML:", category);
  if (category) {
    //Send back questions relating to category selected.
    Question.find({ category }, (err, res) => {
      err ? resp.json(err) : resp.json(res);
    });
  } else {
    Question.find((err, res) => {
      //Send all questions back(not category selected)
      resp.json(res);
    });
  }
};

module.exports = { askQuestion, getQuestion };
