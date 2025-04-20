const { userSchemaValidation } = require("../common/validation.schema");
const { authService } = require("../services/index");
const { errorHandlerUtils } = require("../utils/index");
const { successResponseUtils } = require("../utils/index");

//check email

exports.checkEmail = async (req, res) => {
  try {
    const userEmail = await authService.checkEmail(req);
    return successResponseUtils.successResponse(res, userEmail.message);
  } catch (err) {
    return errorHandlerUtils.handleError(res, err);
  }
};

//check userName

exports.checkUsername = async (req, res) => {
  try {
    const userName = await authService.checkUsername(req);
    return successResponseUtils.successResponse(res, userName.message);
  } catch (err) {
    return errorHandlerUtils.handleError(res, err);
  }
};

exports.register = async (req, res) => {
  try {
    await userSchemaValidation.validate(req.body, { abortEarly: false }); // Validate the request body
    const newUser = await authService.register(req);
    return successResponseUtils.createResponse(
      res,
      newUser.message
    );
  } catch (err) {
    // console.log(err,"err");
    
    return errorHandlerUtils.handleError(res, err);
  }
};
