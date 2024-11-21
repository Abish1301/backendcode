const bcrypt = require("bcryptjs");
const { Auth: AuthModel, AuthUser: AuthUserModel, Role: RoleModel } = require("../models");

const Joi = require('joi'); 
const { generateAccessToken, generateRefreshToken, aliasResponseData, responseHandler, authAttributes, authUserAttributes, roleAttributes } = require("../utils");

const login = async (req, res) => {
  const { email, password } = req.body;

  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
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

    const responseData = {
      accessToken,
      refreshToken,
      authData: aliasResponseData(auth.get(), authAttributes),
      userData: aliasResponseData(authUser.get(), authUserAttributes),
      roleData: authUser.authrole ? aliasResponseData(authUser.authrole.get(), roleAttributes) : null,
    };

    return responseHandler(res, {
      data: responseData,
      status: 'success',
      role: authUser.type,
      message: 'Login successful',
      statusCode: 200,
      error: null,
    });

  } catch (error) {
    console.error(error);
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

  if (!token) return res.sendStatus(403); 

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); 

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
};

module.exports = { login, refreshToken };
