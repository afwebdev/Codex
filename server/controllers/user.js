const User = require("../../models/User");

/* Our User controller
	to be used as a a link between server, and the front end (Our API Calls)
*/

const registerUser = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.status(201).json({
      message: "New user registered successfully!"
    });
  });
};

const findUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found with that login ID!"
      });
    }
    req.profile = user;
    next();
  });
};

const findUserProfile = (req, res) => {
  // eliminate password related fields before sending the user object
  req.profile.hashedPassword = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

module.exports = { findUserById, findUserProfile, registerUser };
