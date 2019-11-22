var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    usd: {type: Number, required: true},
    dex: {type: Number, required: true},
    transaction_type: {type: String, required: true},
    user_dex_id: {type: Schema.Types.ObjectId, ref: "User_Dex"}
},
{timestamps: true}
);

var Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;