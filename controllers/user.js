const { response, request } = require("express");
const Usuario = require("../models/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const isValidEmail = require("../helpers/isValidEmail");

const userGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  // path: http://localhost:8080/api/users?limit=5&from=5
  // const usuarios = await Usuario.find({ state: false })
  //   .limit(Number(limit))
  //   .skip(Number(from));
  // const total = await Usuario.countDocuments({ state: false }); // aqui debería ser true

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ state: false }),
    Usuario.find({ state: false }).limit(Number(limit)).skip(Number(from)),
  ]);
  res.json({
    total,
    usuarios,
  });
};

const userPost = async (req, res) => {
  const { password, name, email, rol } = req.body;
  const usuario = new Usuario({ password, name, email, rol });

  // encryptar el password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // guardar el password en nuestra DB

  await usuario.save();

  res.json({
    message: "post API",
    usuario,
  });
};

const userPut = async (req = request, res) => {
  const { id } = req.params;

  const { password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, rest);
  console.log({ usuario });
  if (usuario) {
    res.json({
      message: "put API",
      usuario,
    });
  }
};

const userPatch = (req, res) => {
  res.json({
    message: "Patch API",
  });
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndDelete(id);

  res.json({
    message: `delete user with id: ${id}`,
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
