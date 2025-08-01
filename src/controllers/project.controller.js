const asyncHandler = require("../utils/asyncHandler.util");
const Project = require("../modals/project")
const ApiResponse = require("../utils/apiResponse.util");
const ApiError = require("../utils/apiError.util");
const User = require("../modals/user");


// GET /api/projects
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate("managerId", "name email");
  res.status(200).json(new ApiResponse(200, projects, "All projects fetched"));
});

// GET /api/projects/:id
const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id).populate("managerId", "name email");

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  res.status(200).json(new ApiResponse(200, project, "Project fetched"));
});

// POST /api/projects

const createProject = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    startDate,
    endDate,
    requiredSkills = [],
    teamSize,
    status
  } = req.body;

  const managerId = req.user._id;

  
  const user = await User.findById(managerId);
  if (!user || user.role !== "manager") {
    throw new ApiError(403, "Only managers can create projects");
  }

  
  const project = await Project.create({
    name,
    description,
    startDate,
    endDate,
    requiredSkills,
    teamSize,
    status,
    managerId
  });

  res
    .status(201)
    .json(new ApiResponse(201, project, "Project created"));
});

module.exports = {
  getAllProjects,
  getProjectById,
  createProject
};
