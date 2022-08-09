const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log("mongo conectado :D");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la conexión de la base de datos...");
  }
};

module.exports = {
  connectDB,
};
