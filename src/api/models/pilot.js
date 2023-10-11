const mongoose = require("mongoose");

const pilotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    nationality: { type: String, required: true, trim: true },
    image: { type: String, required: false },
    car: [{ type: mongoose.Types.ObjectId, ref: "Car" }],
  },
  {
    collection: "pilots",
    timestamps: true,
  },
);

const Pilot = mongoose.model("Pilot", pilotSchema, "pilot");

module.exports = Pilot;