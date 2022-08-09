const { Schema, model } = require("mongoose");

const User = Schema({
  name: {
    type: String,
    required: [true, "the name is require"],
  },
  email: {
    type: String,
    required: [true, "the email is require"],
  },
  password: {
    type: String,
    required: [true, "the password is require"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: false,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

User.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("User", User);
