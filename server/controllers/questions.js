const Question = require("../models/Question");

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
    Question.find({ category, is_pickedup: false })
      .populate("user_id", "user_email user_firstName")
      .exec((err, res) => {
        err ? resp.json(err) : resp.json(res);
      });
  } else {
    Question.find({ is_pickedup: false })
      .populate("user_id", "user_email user_firstName")
      .exec((err, res) => {
        err ? resp.json(err) : resp.json(res);
      });
  }
};

const getQuestionByUser = (req, resp) => {
  console.log("Question By User");

  let id = req.params;
  Question.find({ user_id: id }).exec((err, res) => {
    err ? resp.json(err) : resp.json(res);
  });
};

// Gets question with a certain _id, when you are trying to answer it
// and loads all answers

const getQuestionByID = (req, resp) => {
  console.log("Accesing getQuestionByID function");
  const id = req.params._id;
  //   Question.findOne({_id: id}, (err,docs) =>{
  //     if(!err){
  //     console.log(docs)
  //     resp.json(docs);
  //   }
  //   else{
  //     throw err;
  //   }
  // })
  Question.findOne({ _id: id })
    .populate({
      path: "answer_id",
      populate: {
        path: "comment_id",
        model: "Comment"
      }
    })
    .exec((err, docs) => {
      if (!err) {
        resp.json(docs);
      } else {
        throw err;
      }
    });
};

module.exports = {
  askQuestion,
  getQuestion,
  getQuestionByID,
  getQuestionByUser
};
