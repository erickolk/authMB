const mongoose = require("mongoose");

//connect DB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/authMB");
    console.log("Conectado ao Banco de dados.");
  } catch (err) {
    console.error(err.message);

  }
};

module.exports = connectDB;
