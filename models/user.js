// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var mongoose = require("mongoose");
var Bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  },
  { timestamps: true }
);

//This automatically adds a password field.
userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = Bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(plaintext, callback) {
  return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

var User = mongoose.model("User", userSchema);

module.exports = User;
