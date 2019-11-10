const express = require("express");
const router = express.Router();

const pageRoutes = require("./page");

//ROOT PATH.
//Route => ~/
router.use("/", pageRoutes);
// TODO add other routes here...

module.exports = router;
