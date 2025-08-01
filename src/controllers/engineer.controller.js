const User = require("../modals/user");
const ApiResponse = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const getAllEngineers = asyncHandler(async (_, res) => {
  const engineers = await User.find({ role: "engineer" }).select("-password");

  res.status(200).json(
    new ApiResponse(200, engineers, "Engineers fetched successfully")
  );
});

module.exports = {
  getAllEngineers
};