const { response, request } = require("express");

const userGet = (req = request, res = response) => {
  const query = req.query;
  // path: http://localhost:8080/api/users?name=jeje&limit=10
  res.json({
    message: "get all :D",
    ...query,
  });
};

const userPost = (req, res) => {
  const body = req.body;
  res.json({
    message: "post API",
    ...body,
  });
};

const userPut = (req = request, res) => {
  const { id } = req.params;

  res.json({
    message: "put API",
    id,
  });
};

const userPatch = (req, res) => {
  res.json({
    message: "Patch API",
  });
};

const userDelete = (req, res) => {
  res.json({
    message: "delete API",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
