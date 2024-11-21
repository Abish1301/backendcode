const responseHandler = (res, { data = null, status = 'success', role = null, message = '', statusCode = 200, error = null }) => {
    res.status(statusCode).json({
      data,
      status,
      role,
      message,
      statusCode,
      error,
    });
  };
  
  module.exports = responseHandler;
  