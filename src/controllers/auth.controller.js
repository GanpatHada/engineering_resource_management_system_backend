const jwt = require("jsonwebtoken");
const User = require("../modals/user");
const ApiError = require("../utils/apiError.util");
const ApiResponse = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");
const JWT_SECRET = process.env.JWT_SECRET;

const signup = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    skills,
    seniority,
    maxCapacity,
    department,
  } = req.body;

  if (!name || !email || !password || !role) {
    throw new ApiError(400, "Missing required fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const userObj = {
    name,
    email,
    password,
    role,
  };

  if (seniority !== undefined) userObj.seniority = seniority;
  if (maxCapacity !== undefined) userObj.maxCapacity = maxCapacity;
  if (department !== undefined) userObj.department = department;

  if (Array.isArray(skills) && skills.length > 0) {
    userObj.skills = skills;
  }

  const user = new User(userObj);
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, null, "User created successfully"));
});





const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password -__v -createdAt -updatedAt");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const payload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  user.password = undefined;
  return res.status(200).json(
    new ApiResponse(200, {
      token,
      user
    }, "Login successful")
  );
});


const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select("-__v -createdAt -updatedAt");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  );
});

module.exports = {
  signup,
  login,
  getProfile
};

