const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: { type: String, required: [true, "the role is require"] },
});

module.exports = model("Role", RoleSchema);
