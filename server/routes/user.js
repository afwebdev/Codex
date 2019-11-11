const express = require("express");
const { registerUser, findUserById, findUserProfile } = require("../controllers/user");
// import them to protect routes
const { requireSignin, hasAuthorization } = require("../controllers/auth");

/* router.route is a pretty cool trick,
it instantiates its own route ("/api/users" or "/api/users/:userId") etc 
and allows us to just chain requests off of it.
ie) router.route("/api/example").get(controllerGetSmthg).post(controllerPostSmthg)
*/
const router = express.Router();
//POST Register endpoint
router.route("/api/users").post(registerUser);
//GET User info
router.route("/api/users/:userId").get(requireSignin, findUserProfile);

//sets the :userId param to the return of findUserById
router.param("userId", findUserById);

module.exports = router;
