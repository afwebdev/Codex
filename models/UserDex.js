var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserDexSchema = new Schema({
    dex: {type: Number, required: true, default: 0},
    user_id: {type: Schema.Types.ObjectId, ref: "User"}
},
{timestamps: true}
);

var UserDex = mongoose.model("UserDex", UserDexSchema);

module.exports = UserDex;