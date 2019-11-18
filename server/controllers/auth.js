const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require("../config/index");

/* SIGN IN 
	This is the logic behind ~/auth/signin

	Call to the API will use email sent via req.body, to check if email exists in DB
	If the email is NOT found, send back 401 status code, and err message.
	if the email or password is incorrect, send back 401 and err message.

	Note: !user.authenticate(req.body.user_password)
	In the user model, we have defined a method called authenticate, that takes
	a plain text password, encrypts it with salt, and compares it to the stored hashed password.

*/
const signin = (req, res) => {
  // console.log(req.body.user_email, req.body.user_password)
  User.findOne({ user_username: req.body.user_username }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User not found"
      });
    }
    if (!user.authenticate(req.body.user_password)) {
      return res.status(401).json({
        error: "Wrong Email or Password!"
      });
    }

    //Create our token.
    const token = jwt.sign(
      {
        _id: user._id
      },
      config.jwtSecret
    );

    //SETS our token to be sent to the client as a cookie, that expires a long time from now.
    //This date can be changed.
    res.cookie("token", token, {
      expire: new Date() + 9999
    });

    /* Mission Success.. lets send back some json, 
	We're sending back the token, and user info via JSON. 
	**THIS INFO IS WHAT WE STORE FOR STATE**
	THE TOKEN IS BEING SAVED ON CLIENT VIA COOKIE ABOVE. */
    return res.json({
      token,
      user: {
        _id: user._id,
        username: user.user_username,
        user_email: user.user_email,
        user_firstName: user.user_firstName,
        user_lastName: user.user_lastName
      }
    });
  });
};

/*  SIGN OUT 
	We're simply clearing the cookie called token.
	this will clear the cookie from the browser,
	thus logging a user out.
*/
const signout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Sign out successful!"
  });
};

/* What is express-jwt?
Middleware that validates JsonWebTokens and sets req.user.
This module lets you authenticate HTTP requests using JWT tokens
 in your Node.js applications.
 https://www.npmjs.com/package/express-jwt 
 */

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth"
});

const hasAuthorization = (req, res) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized!"
    });
  }
};

module.exports = { hasAuthorization, requireSignin, signout, signin };
