const express = require("express");
const router = express.Router();
const {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignment.controller");

const verifyJwt = require("../middlewares/auth.middleware");
const isManager = require("../middlewares/isManager.middleware");

router.get("/", getAllAssignments);
router.post("/", verifyJwt, isManager, createAssignment);
router.put("/:id", verifyJwt, isManager, updateAssignment);
router.delete("/:id", verifyJwt, isManager, deleteAssignment);

module.exports = router;
