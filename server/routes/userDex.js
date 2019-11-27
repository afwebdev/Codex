const express = require("express");
const router = express.Router();
const { addDex, subtractDex } = require("../controllers/userDex");

router.route("/transaction/add").put(addDex);

router.route("/transaction/subtract").put(subtractDex);

module.exports = router;
