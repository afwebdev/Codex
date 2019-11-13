const {Answer} = require("../../models");

// Will get all answered questions for a particular user
// We will store this user info in the cookie and can access
// it in requests
const getAnsweredQuestions = (req,res,next) => {
    // allows you to get user id from the cookie
    var userID = req.cookies._id;
    Answer.find({user_id: userID}, (err,docs) =>{
        if(!err){
            res.json(docs);
        }
        else{
            throw err;
        }
    })

};


// Posts an answer with that specific user id which will
// be accessed from cookie
const postAnswer = (req,res,next) =>{
    console.log("THIS IS THE COOKIE")
    console.log(req.cookies)
    //Will use one or other depending on how ours is sent. 
    // I am testing with postman
     req.body.user_id = req.cookies._id;
     //req.body.user_id = req.cookies.token;
     let answer = new Answer(req.body);
     // this will be stored on the front end
     let question = "5dcb611196a38203b8c3434a";
     console.log("THIS IS THE REQUEST");
     console.log(req.body);
    Answer.create(req.body)
     .then((dbAnswer) => {
         // When a new answer is posted successfully, use the question id
         // from the request, to push answer id into its array
        return Question.findOneAndUpdate({_id: question}, {$push: {answer_id: dbAnswer._id}}, {new: true});
     })
     .then((dbQuestion) =>{
         res.json(dbQuestion);
     })
     .catch((err)=>{
         res.json(err);
     })

}

const upVoteAnswer = (req,res,next) => {
    // the answer_id will be stored on the front end
    const answerId = "5dcc8a8e83827fd798783b2c";
    // will come from the front end
    const rating = 5
    Answer.findByIdAndUpdate(answerId, {$set: {rating}}, (err,docs) =>{
        if(!err){
            res.json(docs);
        }
        else{
            throw err;
        }
    })
}

module.exports = {
    getAnsweredQuestions,
    postAnswer,
    upVoteAnswer
};