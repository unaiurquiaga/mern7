const mongoose = require("mongoose");

mongoose.set("strict", false);
mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado con éxito");
  } catch (error) {
    console.log("Error al conectarse", error);
  }
};

module.exports = { connectDB };