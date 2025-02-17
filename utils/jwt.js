const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.user, role: user.role,  ...(user.type === "Incharge" ? { incharge: user.id } : {})
  }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  };
  
  const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.user, role: user.role, ...(user.type === "Incharge" ? { incharge: user.id } : {}) }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
  };


  module.exports={generateAccessToken,generateRefreshToken}