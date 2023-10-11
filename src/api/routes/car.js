const express = require("express");
const { isAuth } = require("../../middleware/auth");
const {
  getAllCars,
  getCarById,
  createNewCar,
  updateCar,
  deleteCar,
  updateImagesCar,
} = require("../controller/car");
const upload = require("../../middleware/file");

const carsRouters = express.Router();

carsRouters.get("/", getAllCars);
carsRouters.get("/:id", getCarById);
carsRouters.post("/", [isAuth], upload.array("images", 4), createNewCar);
carsRouters.put("/:id", [isAuth], upload.array("images", 4), updateCar);
carsRouters.put(
  "/images/:id",
  [isAuth],
  upload.array("images", 4),
  updateImagesCar,
);
carsRouters.delete("/:id", [isAuth], deleteCar);

module.exports = carsRouters;