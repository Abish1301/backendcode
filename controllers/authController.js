const bcrypt = require("bcryptjs");
const { Auth: AuthModel, AuthUser: AuthUserModel, Role: RoleModel, Site } = require("../models");
const Joi = require('joi');
const { generateAccessToken, generateRefreshToken, aliasResponseData, responseHandler, authAttributes, authUserAttributes, roleAttributes, roleMaterAttributes, siteMasterAttributes } = require("../utils");
const Logger = require("../utils/logger"); // Assuming the logger file is in the root directory

const login = async (req, res) => {
  const { email, password } = req.body;

  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
    Logger.warn(`Login validation failed for email: ${email} - ${error.details[0].message}`); // Log validation error
    return responseHandler(res, {
      data: null,
      status: 'error',
      message: error.details[0].message,
      statusCode: 400,
      error: 'Validation error',
    });
  }

  try {
    // Find the user based on the email
    const auth = await AuthModel.findOne({
      where: { email },
      include: [
        {
          model: AuthUserModel,
          as: 'authuser',
          include: [
            {
              model: RoleModel,
              as: 'authrole',
            },
          ],
        },
      ],
    });

    if (!auth || !(await bcrypt.compare(password, auth.password))) {
      Logger.error(`Login failed for email: ${email} - Invalid credentials`); // Log authentication failure
      return responseHandler(res, {
        data: null,
        status: 'error',
        message: 'Invalid email or password',
        statusCode: 401,
        error: 'Authentication failed',
      });
    }

    const authUser = auth.authuser;
    if (!authUser) {
      Logger.error(`Login failed for email: ${email} - User not found`); // Log missing user data
      return responseHandler(res, {
        data: null,
        status: 'error',
        message: 'User not found',
        statusCode: 404,
        error: 'User data missing',
      });
    }

    // Generate the tokens
    const accessToken = generateAccessToken(authUser);
    const refreshToken = generateRefreshToken(authUser);
    const userData = aliasResponseData(authUser.get(), authUserAttributes);
    const siteData = userData.type === "Incharge" 
    ? (await Site.findAll({ 
        where: { incharge: String(userData.id) }, 
        attributes: ["id"] // Fetch only the 'id' column
      })).map(site => site.id) 
    : null;
        
    const responseData = {
      accessToken,
      refreshToken,
      authData: aliasResponseData(auth.get(), authAttributes),
      userData: userData,
      siteData: siteData,
      roleData: authUser.authrole ? aliasResponseData(authUser.authrole.get(), roleMaterAttributes) : null,
    };

    Logger.info(`Login successful for email: ${email}`); // Log successful login

    return responseHandler(res, {
      data: responseData,
      status: 'success',
      role: authUser.type,
      message: 'Login successful',
      statusCode: 200,
      error: null,
    });

  } catch (error) {
    Logger.error(`Error during login for email: ${email} - ${error.message}`); // Log unexpected errors
    return responseHandler(res, {
      data: null,
      status: 'error',
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};

const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    Logger.warn('Refresh token not provided'); // Log missing token
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      Logger.error('Invalid refresh token'); // Log invalid token error
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken(user);
    Logger.info(`Refresh token used successfully for user: ${user.email}`); // Log successful refresh

    res.json({ accessToken });
  });
};

module.exports = { login, refreshToken };
