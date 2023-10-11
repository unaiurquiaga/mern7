const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    images: [{ type: String }],
    year: { type: Number, required: true, trim: true },
    pilot: { type: mongoose.Types.ObjectId, ref: "Pilot" },
    category: { type: String, required: true, enum: ["Rally", "F1", "Dakar"] },
  },
  {
    collection: "cars",
    timestamps: true,
  },
);

const Car = mongoose.model("Car", carSchema, "cars");

module.exports = Car;