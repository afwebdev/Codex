const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_firstName: {
    type: String,
    trim: true,
    required: "First Name is required"
  },
  user_lastName: {
    type: String,
    trim: true,
    required: "Last Name is required"
  },
  user_email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
    get: obfuscate
  },
  user_username: {
    type: String,
    trim: true,
    unique: "Username already exists",
    required: "Username is required"
  },
  user_country: {
    type: String,
    trim: true
  },
  hashedPassword: {
    type: String,
    required: "Password is required"
  },
  salt: {
    type: String
  },
  user_dex: {type: Schema.Types.ObjectId, ref: "UserDex"}
}, {timestamps: true});

//Allow use of getters.
//Used here to obfuscate email when querying for it.
userSchema.set("toJSON", { getters: true });

function obfuscate(email) {
  const separatorIndex = email.indexOf("@");
  if (separatorIndex < 3) {
    // 'ab@gmail.com' -> '**@gmail.com'
    return (
      email.slice(0, separatorIndex).replace(/./g, "*") +
      email.slice(separatorIndex)
    );
  }
  // 'test42@gmail.com' -> 'te****@gmail.com'
  return (
    email.slice(0, 2) +
    email.slice(2, separatorIndex).replace(/./g, "*") +
    email.slice(separatorIndex)
  );
}

//Creates a "Virtual" document property called user_password (hidden col type thing)
//the setter, which generates our hashed password, using the methods below,
// sets our hashedPassword and salt.
//Think of this as a helper, when creating a password.
//WE WILL SEND REQUESTS TO API AS FOLLOWS:
/* 
	{
		user_firstName: "bob",
		user_lastName: "bobberson",
		user_email: "a@a.com",
		user_password: imAPasswordOver6CharLong,
	} 
*/
userSchema
  .virtual("user_password")
  .set(function(password) {
    //password param comes from req. ie) {user_password: "pass"}
    //acts as a setter on our virtual document, creates our hashed pass/salt
    //NOTE THE private, GLOBAL variable _password.
    this._password = password; //set a private var to received password
    this.salt = this.makeSalt(); //set salt to the returned val of schema method makeSalt
    this.hashedPassword = this.encryptedPassword(password);
    // ^^ sets hashedPassword to encryptedPassword fn's return
  })
  .get(function() {
    //get is fired off whenever we make a req to retrieve user data.
    //what is shown in res.json() is this password.
    return this._password;
  });

//Define Schema Methods.
userSchema.methods = {
  /* Used whenever we call User.authenticate("plaintextPassword"),
		Returns TRUE if encrypted version of password is same as stored db password.
		Returns FALSE if they do not match.
  */
  authenticate: function(plainText) {
    return this.encryptedPassword(plainText) === this.hashedPassword;
  },

  /* Encrypts a password, used when we make a new User,Refer to req.body obj above, 
	user_password setter, calls this method.
	
	 We utilize this function to encrypt our password.
	 Salt is used as a ONE time encryption key,
	 ie) hashedPass = plainText+RandomSalt then > encryption.
  */
  encryptedPassword: function(password) {
    //if pass is falsey, return a ""(falsey)
    if (!password) return "";
    try {
      //password not falsey, return the encrypted password now.
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      //err, return "" (falsey)
      return "";
    }
  },

  //Generates a random salt.
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};

//Validation on hashedPassword field.
/* 
	Check if hashed password is truthy && if our _password is > 6 char
	Check if this document is a new record, and if a password was entered.
*/
userSchema.path("hashedPassword").validate(function(v) {
  if (this.hashedPassword && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters long.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required.");
  }
}, null);

module.exports = mongoose.model("User", userSchema);
