const express = require("express");
const router = express.Router();
const { getAllEngineers } = require("../controllers/engineer.controller");

router.get("/", getAllEngineers);

module.exports = router;
