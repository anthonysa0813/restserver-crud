const Role = require("../models/role");

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error("Role doesn't exist in the database");
  }
};

module.exports = isValidRole;
