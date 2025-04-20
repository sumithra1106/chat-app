const { message } = require("../constants/constant");
const { userModel } = require("../models/index");

//check email

exports.checkEmail = async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) {
      throw new Error(message.users.EMAIL_REQUIRED);
    }
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error(message.users.EMAIL_EXISTS);
    }
    return { message: message.users.EMAIL_AVAILABLE };
  } catch (err) {
    throw err;
  }
};

//check userName

exports.checkUsername = async (req, res) => {
  const { userName } = req.query;
  try {
    if (!userName) {
      throw new Error(message.users.USERNAME_REQUIRED);
    }
    const user = await userModel.findOne({ userName });
    if (user) {
      throw new Error(message.users.USERNAME_EXISTS);
    }
    return { message: message.users.USERNAME_AVAILABLE };
  } catch (err) {
    throw err;
  }
};

// user register

exports.register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // if (!email) {
    //   throw new Error(message.users.EMAIL_REQUIRED);
    // }
    // if (!userName) {
    //   throw new Error(message.users.USERNAME_REQUIRED);
    // }
    // if (!password) {
    //   throw new Error(message.users.PASSWORD_REQUIRED);
    // }

    const user = await userModel.findOne({ $or: [{ userName }, { email }] });
    if (user) {
      if (user.userName == userName) {
        throw new Error(message.users.USERNAME_EXISTS);
      }
      if (user.email == email) {
        throw new Error(message.users.EMAIL_EXISTS);
      }
    }
    const userInfo = new userModel({
      userName,
      email,
      password,
      status: "Active",
    });
    await userInfo.save();
    return { message: message.users.REGISTER_SUCCESSFULLY };
  } catch (err) {
    throw err;
  }
};
