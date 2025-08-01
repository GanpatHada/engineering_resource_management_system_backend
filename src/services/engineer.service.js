const User = require("../modals/user")
const Assignment = require("../modals/assignment");
const ApiError = require("../utils/apiError.util");

async function getAvailableCapacity(engineerId) {
  const engineer = await User.findById(engineerId);
  if (!engineer || engineer.role !== "engineer") {
    throw new ApiError(404, "Engineer not found");
  }

  const activeAssignments = await Assignment.find({ engineerId });

  const totalAllocated = activeAssignments.reduce(
    (sum, a) => sum + a.allocationPercentage,
    0
  );

  return engineer.maxCapacity - totalAllocated;
}

module.exports = {
  getAvailableCapacity
};
