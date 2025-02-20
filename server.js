const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const Logger = require("./utils/logger"); // Importing the logger
const cors = require("cors");
const { authenticateToken } = require("./middleware/authMiddleware");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// For URL-encoded form payloads (default limit is 1mb; increase as needed)
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
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


app.listen(PORT, () => {
  Logger.info(`Hi, this is the backend for the construction app, calling from port ${PORT}`);
});
