const asyncHandler = require("../utils/asyncHandler.util");
const Assignment =require("../modals/assignment");
const ApiResponse = require("../utils/apiResponse.util");
const ApiError = require("../utils/apiError.util");
const User = require("../modals/user");
const { getAvailableCapacity } = require("../services/engineer.service");


// GET /api/assignments
const getAllAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find()
    .populate("engineerId", "name email")
    .populate("projectId", "name");

  res.status(200).json(
    new ApiResponse(200, assignments, "All assignments fetched")
  );
});

// POST /api/assignments
const createAssignment = asyncHandler(async (req, res) => {
  const {
    engineerId,
    projectId,
    allocationPercentage,
    startDate,
    endDate,
    role
  } = req.body;

  const engineer = await User.findById(engineerId);
  if (!engineer || engineer.role !== "engineer") {
    throw new ApiError(400, "Invalid engineer");
  }

  const available = await getAvailableCapacity(engineerId);
  if (available < allocationPercentage) {
    throw new ApiError(
      400,
      `Only ${available}% capacity available. Cannot assign ${allocationPercentage}%.`
    );
  }

  const assignment = await Assignment.create({
    engineerId,
    projectId,
    allocationPercentage,
    startDate,
    endDate,
    role
  });

  res.status(201).json(
    new ApiResponse(201, assignment, "Assignment created successfully")
  );
});

// PUT /api/assignments/:id
const updateAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const assignment = await Assignment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!assignment) {
    throw new ApiError(404, "Assignment not found");
  }

  res.status(200).json(
    new ApiResponse(200, assignment, "Assignment updated successfully")
  );
});

// DELETE /api/assignments/:id
const deleteAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const assignment = await Assignment.findByIdAndDelete(id);

  if (!assignment) {
    throw new ApiError(404, "Assignment not found");
  }

  res.status(200).json(
    new ApiResponse(200, assignment, "Assignment deleted successfully")
  );
});

module.exports = {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
};
