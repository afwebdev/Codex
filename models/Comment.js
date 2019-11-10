var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment: {type: String},
    rejection_reason: {type: String},
    user_id: {type: Schema.Types.ObjectId, ref: "User"}
},
{timestamps: true}
);

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;