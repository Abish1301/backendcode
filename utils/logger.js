// const { createLogger, format, transports } = require('winston');

// // Create a logger instance
// const logger = createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp(),
//     format.json()
//   ),
//   transports: [
//     new transports.Console({
//       level: process.env.NODE_ENV === 'production' ? 'error' : 'info' // Log errors in production, info in development
//     }),
//     new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a separate file
//     new transports.File({ filename: 'combined.log' }) // Log all messages to combined.log
//   ]
// });

// module.exports = logger;
