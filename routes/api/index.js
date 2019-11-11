const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const dataRoutes = require("./data");

//Route=> ~/api/
router.use("/auth", authRoutes);
//Route=> ~/api/data
router.use("/data", dataRoutes);
// TODO feel free to add your other routes here...
// eg. /api/admin -> router.use("/admin", adminRoutes);

module.exports = router;
