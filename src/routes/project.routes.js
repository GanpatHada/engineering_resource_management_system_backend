const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject
} = require("../controllers/project.controller");

const verifyJwt = require("../middlewares/auth.middleware"); 

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", verifyJwt, createProject); 

module.exports = router;
