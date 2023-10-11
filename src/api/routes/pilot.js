const express = require("express");
const {
  getAllPilots,
  getPilotById,
  createNewPilot,
  updatePilot,
  deletePilot,
} = require("../controller/pilot");
const upload = require("../../middleware/file");
const { isAuth } = require("../../middleware/auth");

const pilotsRouters = express.Router();

pilotsRouters.get("/", getAllPilots);
pilotsRouters.get("/:id", getPilotById);
pilotsRouters.post("/", [isAuth], upload.single("image"), createNewPilot);
pilotsRouters.put("/:id", [isAuth], upload.single("image"), updatePilot);
pilotsRouters.delete("/:id", [isAuth], deletePilot);

module.exports = pilotsRouters;