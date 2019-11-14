var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
  {
    category: { type: String, required: true },
    question: { type: String, required: true },
    dex: { type: Number, required: true },
    language: { type: String, required: true },
    expiry_time: { type: Date, required: true },
    is_pickedup: { type: Boolean, required: true, default: false },
    is_answer_approved: { type: Boolean, required: true, default: false },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    answer_id: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    comment_id: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
);

//just testing something  here, it defaults expiry_time to 24hours.
QuestionSchema.virtual("exp_date").set(function(date) {
  this._date = new Date();
  this._date.setDate(this._date.getDate() + 1);
  this.expiry_time = this._date;
  console.log(this._date);
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
