const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  }
},{
    timestamps:true,versionKey:false
});

const user = model("users", userSchema);
module.exports = user;
