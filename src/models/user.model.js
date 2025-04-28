const { Schema, model } = require("mongoose");
const { message } = require("../constants/constant.messages");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, message.users.EMAIL_REQUIRED],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, message.users.EMAIL_FORMAT],
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    verified: { type: Boolean, default: false },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const user = model("users", userSchema);
module.exports = user;
