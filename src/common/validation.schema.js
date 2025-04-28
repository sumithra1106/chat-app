const yup = require("yup");
const { message } = require("../constants/constant.messages");

exports.userSchemaValidation = yup.object({
  userName: yup
    .string()
    .required(message.users.USERNAME_REQUIRED)
    .min(3, message.users.USERNAME_MIN_LENGTH)
    .max(15, message.users.USERNAME_MIN_LENGTH),
  email: yup
    .string()
    .required(message.users.EMAIL_REQUIRED)
    .email(message.users.EMAIL_FORMAT),
  password: yup
    .string()
    .required(message.users.PASSWORD_REQUIRED)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,15}$/,
      message.users.PASSWORD_LENTH_MATCH
    ),
});

exports.checkEmailValidation = yup.object({
  email: yup
    .string()
    .required(message.users.EMAIL_REQUIRED)
    .email(message.users.EMAIL_FORMAT),
});

exports.checkUserNameValidation = yup.object({
  userName: yup
    .string()
    .required(message.users.USERNAME_REQUIRED)
    .min(3, message.users.USERNAME_MIN_LENGTH)
    .max(15, message.users.USERNAME_MAX_LENGTH),
});
