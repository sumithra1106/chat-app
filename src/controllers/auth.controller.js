const {
  userSchemaValidation,
  checkEmailValidation,
  checkUserNameValidation,
} = require("../common/validation.schema");
const { authService } = require("../services/index");
const { errorHandlerUtils } = require("../utils/index");
const { successResponseUtils } = require("../utils/index");

//check email

exports.checkEmail = async (req, res) => {
  try {
    await checkEmailValidation.validate(
      { email: req.query.email },
      { abortEarly: false }
    );
    const userEmail = await authService.checkEmail(req);
    return successResponseUtils.successResponse(res, userEmail.message);
  } catch (err) {
    return errorHandlerUtils.handleError(res, err);
  }
};

//check userName

exports.checkUsername = async (req, res) => {
  try {
    await checkUserNameValidation.validate(
      { userName: req.query.userName },
      {
        abortEarly: false,
      }
    );
    const userName = await authService.checkUsername(req);
    return successResponseUtils.successResponse(res, userName.message);
  } catch (err) {
    return errorHandlerUtils.handleError(res, err);
  }
};

//user register
exports.register = async (req, res) => {
  try {
    await userSchemaValidation.validate(req.body, { abortEarly: false });
    const newUser = await authService.register(req);
    return successResponseUtils.createResponse(res, newUser.message);
  } catch (err) {
    return errorHandlerUtils.handleError(res, err);
  }
};

//verify-token

exports.verifyToken = async (req, res) => {
  try {
    const verifyUser = await authService.verifyToken(req);
    return successResponseUtils.createResponse(res, verifyUser.message);
  } catch (err) {
    return errorHandlerUtils.handleError(res, err);
  }
};


//login

exports.login = async (req, res) => {
  try {
  } catch (err) {}
};
