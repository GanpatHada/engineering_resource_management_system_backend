const User = require("../modals/user");
const Assignment = require("../modals/assignment")
const ApiResponse = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");
const ApiError = require("../utils/apiError.util");

const getAllEngineers = asyncHandler(async (_, res) => {
  const engineers = await User.find({ role: "engineer" }).select("-password");

  res.status(200).json(
    new ApiResponse(200, engineers, "Engineers fetched successfully")
  );
});



const getEngineerCapacity = asyncHandler(async (req, res) => {
  const engineerId = req.params.engineerId;

  const engineer = await User.findById(engineerId);
  if (!engineer || engineer.role !== "engineer") {
    return res.status(404).json({ message: "Engineer not found" });
  }

  const assignments = await Assignment.find({engineerId});

  const totalAllocated = assignments.reduce(
    (sum, a) => sum + a.allocationPercentage,
    0
  );

  const availableCapacity = (engineer.maxCapacity || 100) - totalAllocated;

  res.status(200).json(
    new ApiResponse(200, { availableCapacity }, "Capacity fetched")
  );
});

const updateEngineerSkills = asyncHandler(async (req, res) => {
  const { skills } = req.body;

  if (!Array.isArray(skills) || skills.length === 0) {
    throw new ApiError(400, "Skills must be a non-empty array.");
  }

  const user = await User.findById(req.user._id);

  if (!user || user.role !== "engineer") {
    throw new ApiError(403, "Only engineers can update their skills.");
  }

  user.skills = skills;
  await user.save();

  res.status(200).json(
    new ApiResponse(200, user, "Skills updated successfully.")
  );
});

module.exports = {
  getAllEngineers,
  getEngineerCapacity,
  updateEngineerSkills
};