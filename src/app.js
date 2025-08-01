const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const errorHandler = require("./middlewares/errorHandler.middleware");
const path = require("path");

const assignmentRoutes = require("./routes/assignment.routes");
const engineerRoutes = require("./routes/engineer.routes");
const projectRoutes = require("./routes/project.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});


// Your Routes Here
app.use("/api/engineers", engineerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/assignments", assignmentRoutes);

app.use("/api/auth", authRoutes);
app.use(errorHandler);

module.exports = app;
