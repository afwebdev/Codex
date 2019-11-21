const {Answer, Comment} = require("../../models");

const postReply = (req,res,next) => {
    console.log("Made it to the backend buddy")
    let answer = req.body.answer_id;
    Comment.create(req.body)
    .then((dbReply) => {
        return Answer.findOneAndUpdate({_id:answer}, {$push:{comment_id: dbReply._id}}, {new:true})
    })
    .then((dbAnswerReply) =>{
        Answer.findOne({_id: answer}).
        populate('comment_id')
        .exec((err,docs) => {
            if(!err){
                console.log(docs)
                res.json(docs)
            }
            else{
                throw err
            }
        })
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports = {
    postReply
}