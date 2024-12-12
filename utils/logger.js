const { createLogger, format, transports } = require("winston");
const path = require("path");
const fs = require("fs");

// Create the 'logs' directory if it doesn't exist
const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create a logger instance
const Logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "info",
    }),
    new transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(
        logDirectory,
        `combined-${new Date().toISOString().split("T")[0]}.log`
      ),
    }),
  ],
});

module.exports = Logger;
