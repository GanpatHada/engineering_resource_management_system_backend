const express = require("express");
const { signup, login, getProfile } = require("../controllers/auth.controller");
const verifyJwt = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", verifyJwt, getProfile);

module.exports = router;