const { message } = require("../constants/constant.messages");
const { userModel } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { emailServiceUtils } = require("../utils/index");

//check email

exports.checkEmail = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.query.email,
      verified: true,
    });
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
  try {
    const user = await userModel.findOne({
      userName: req.query.userName,
      verified: true,
    });
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
  const { userName, email, password, role } = req.body;
  try {
    const user = await userModel.find({
      $or: [{ userName }, { email }],
    });

    if (user && user.length > 0) {
      user.forEach((data) => {
        if (data.verified) {
          if (data.userName === userName)
            throw new Error(message.users.USERNAME_EXISTS);
          if (data.email === email) throw new Error(message.users.EMAIL_EXISTS);
        }
      });

      await userModel.deleteMany({
        $and: [
          { verified: false },
          {
            $or: [{ userName }, { email }],
          },
        ],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userInfo = new userModel({
      userName,
      email,
      password: hashedPassword,
      status: "Pending",
      verified: false,
      role,
    });
    await userInfo.save();

    const token = jwt.sign({ userName, email }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    
    const verifyLink = `${process.env.CLIENT_URL}/auth/verify?token=${token}`;
    await emailServiceUtils.sendMail(
      email,
      "Verify Your Account",
      `<h3>Verify Your Email</h3>,
          <p>Click here to verify your email:</p>
          <a href='${verifyLink}'>${verifyLink}</a> `
    );
    return { message: message.users.REGISTER_SUCCESSFULLY };
  } catch (err) {
    throw err;
  }
};

//verified

exports.verifyToken = async (req, res) => {
  try {
    const decodeToken = jwt.decode(req.query.token);

    const user = await userModel.findOne({ email: decodeToken.email });
    if (user) {
      if (user.verified) {
        return { message: message.users.EMAIL_ALREADY_VERIFIED };
      }
      const verifyToken = jwt.verify(req.query.token, process.env.JWT_SECRET);
      await userModel.updateOne(
        { email: verifyToken.email },
        { $set: { status: "Active", verified: true } }
      );
      return { message: message.users.EMAIL_VERIFIED };
    }
    throw new Error(message.users.USER_NOT_FOUND);

    // const verifyUser = jwt.verify(req.query.token, process.env.JWT_SECRET);
    // const user = await userModel.findOne({ email: verifyUser.email });
    // if (user) {
    //   if (user.verified) {
    //     return { message: message.users.EMAIL_ALREADY_VERIFIED };
    //   }
    //   await userModel.updateOne(
    //     { email: user.email },
    //     { $set: { status: "Active", verified: true } }
    //   );
    //   return { message: message.users.EMAIL_VERIFIED };
    // }
    // throw new Error(message.users.USER_NOT_FOUND);
  } catch (err) {
    throw err;
  }
};

//login

exports.login = async (req, res) => {
  try {
  } catch (err) {}
};
