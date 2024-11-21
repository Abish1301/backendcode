// const { logger } = require("../utils/logger");

// const logMiddleware = (req, res, next) => {
//   logger.info(`Request: ${req.method} ${req.url}`, { headers: req.headers, query: req.query });

//   res.on('finish', () => {
//     logger.info(`Response: ${res.statusCode} ${res.statusMessage}`);
//   });

//   next();
// };

// module.exports = logMiddleware;
