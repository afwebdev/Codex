var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var User_Dex_Schema = new Schema({
    dex: {type: Number, required: true, default: 0},
    user_id: {type: Schema.Types.ObjectId, ref: "User"}
},
{timestamps: true}
);

var User_Dex = mongoose.model("User_Dex", User_Dex_Schema);

module.exports = User_Dex;