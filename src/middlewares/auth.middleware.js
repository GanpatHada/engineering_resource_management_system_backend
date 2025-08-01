const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError.util");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyJwt = (req,_, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

module.exports = verifyJwt;
