var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    question: {type: String, required: true},
    dex: {type: Number, required: true},
    language: {type: String, required: true},
    expiry_time: {type: Date, required: true},
    is_pickedup: {type: Boolean, required: true, default: false},
    is_answer_approved: {type: Boolean, required: true, default: false},
    user_id: {type: Schema.Types.ObjectId, ref: "User"},
    answer_id: [{type: Schema.Types.ObjectId, ref: "Answer"}],
    comment_id: [{type: Schema.Types.ObjectId, ref: "Comment"}]
},
{timestamps: true});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;