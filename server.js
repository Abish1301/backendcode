const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const Logger = require("./utils/logger"); // Importing the logger
const cors = require("cors");
const { authenticateToken } = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Uncomment to log headers and body if necessary
  // Logger.info("Headers:", req.headers);
  // Logger.info("Body:", req.body);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Dynamically load route files
fs.readdirSync("./routes/").forEach((file) => {
  if (file.endsWith(".js")) {
    const routePath = "/api/" + file.split(".")[0];
    const routeModule = require("./routes/" + file);
    if (routePath === "/api/auth") {
      app.use(routePath, routeModule);
    } else {
      // app.use(routePath, authenticateToken, routeModule);
      app.use(routePath, routeModule);
    }
    Logger.info(`API route loaded: ${routePath}`);
  }
});

// 404 handler
app.use((req, res) => {
  Logger.warn(`Endpoint not found: ${req.originalUrl}`);
  res.status(404).json({ message: "Endpoint not found" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  Logger.info(`Hi, this is the backend for the construction app, calling from port ${PORT}`);
});
