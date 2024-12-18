const multer = require("multer");

// Configure Multer to handle image uploads in memory
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });
module.exports = { upload };