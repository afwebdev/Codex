// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.plugin(require("mongoose-bcrypt"), { rounds: 8 });

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// Hooks are automatic methods that run during various phases of the User Model lifecycle
// In this case, before a User is created, we will automatically hash their password
userSchema.pre("save", function() {
  console.log(this.password);
  console.log(docs);
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
});

var User = mongoose.model("User", userSchema);

module.exports = User;
