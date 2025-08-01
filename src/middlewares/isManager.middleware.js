const ApiError = require("../utils/apiError.util");


const isManager = (req,_, next) => {
  if (req.user && req.user.role === "manager") {
    return next(); 
  }

  throw new ApiError(403, "Access denied. Only managers are allowed.");
};

module.exports = isManager;
