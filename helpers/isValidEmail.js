const Usuario = require("../models/user");

const isValidEmail = async (email) => {
  console.log({ email });
  const existEmail = await Usuario.findOne({ email });
  if (existEmail) {
    throw new Error("The email address is already");
  }
};

const isValidId = async (id) => {
  console.log({ id });
  const existUser = await Usuario.findById(id);
  if (!existUser) {
    throw new Error(`the id ${id} dont exist`);
  }
};

module.exports = {
  isValidId,
  isValidEmail,
};
