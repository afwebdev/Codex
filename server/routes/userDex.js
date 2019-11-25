const express = require("express");
const router = express.Router();
const { addDex, subtractDex } = require("../controllers/userDex");

router.route("/transaction/add").post(addDex);

router.route("/transaction/subtract").post(subtractDex);

module.exports = router;
