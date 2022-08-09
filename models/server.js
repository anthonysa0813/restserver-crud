const cors = require("cors");
const express = require("express");
const { connectDB } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5050;
    this.userPath = "/api/users";

    // conexión a la DB
    this.dbConnect();
    // middlewares
    this.middleware();
    // routes
    this.routes();
  }

  async dbConnect() {
    await connectDB();
  }

  middleware() {
    this.app.use(cors());

    // parseo y lectura del body
    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`the application listening in the port ${process.env.PORT}`);
    });
  }
}

module.exports = Server;
