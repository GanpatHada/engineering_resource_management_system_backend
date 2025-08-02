const express = require("express");
const router = express.Router();
const { getAllEngineers, getEngineerCapacity, updateEngineerSkills } = require("../controllers/engineer.controller");
const verifyJwt = require("../middlewares/auth.middleware");

router.get("/", getAllEngineers);
router.get("/:engineerId/capacity",getEngineerCapacity);
router.put("/update-skills", verifyJwt, updateEngineerSkills);

module.exports = router;
