const { setError } = require("../../config/error");
const { deleteFile } = require("../../middleware/deletefile");
const Car = require("../models/car");

const getAllCars = async (req, res, next) => {
  try {
    const allCars = await Car.find();
    return res.status(200).json({ data: allCars });
  } catch (error) {
    return next(setError(401, "Can't find cars"));
  }
};

const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    if (!car) {
      return next(setError(400, "Car not found"));
    }

    const carId = await Car.findById(id).populate({
      path: "pilot",
      select: "_id name surname nationality image",
    });
    return res.status(200).json({ data: carId });
  } catch (error) {
    return next(setError(401, "Can't find car by ID"));
  }
};

const createNewCar = async (req, res, next) => {
  try {
    const newCar = new Car(req.body);

    if (req.files && req.files.length > 0) {
      newCar.images = req.files.map((file) => file.path);
    }

    const carBBDD = await newCar.save();
    return res.status(201).json({ data: carBBDD });
  } catch (error) {
    console.error("Error", error);
    req.files.map((file) => deleteFile(file.path));
    return next(setError(401, `Can't create new car ${error.message}`));
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, year, pilot, category } = req.body;
    const updateCar = {};

    const updateCarBBDD = await Car.findById(id);

    if (!updateCarBBDD) {
      req.files.map((file) => deleteFile(file.path));
      return next(setError(400, "Car not found ❌"));
    }

    if (req.files && req.files.length > 0) {
      const updateImages = req.files.map((file) => file.path);
      updateCar.$push = { images: { $each: updateImages } };
    }

    if (name) {
      updateCar.name = name;
    }
    if (year) {
      updateCar.year = year;
    }
    if (pilot) {
      updateCar.pilot = pilot;
    }
    if (category) {
      updateCar.category = category;
    }

    const updateAllCar = await Car.findByIdAndUpdate(id, updateCar, {
      new: true,
    });
    return res.status(200).json({ data: updateAllCar });
  } catch (error) {
    req.files.map((file) => deleteFile(file.path));
    return next(setError(401, "Can't update car "));
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldImagesCloudinary = await Car.findById(id);

    if (oldImagesCloudinary.images) {
      oldImagesCloudinary.images.map((image) => deleteFile(image));
    }

    const car = await Car.findByIdAndDelete(id);
    return res.status(200).json({ data: `Removed: ${car.name}` });
  } catch (error) {
    return next(setError(401, "Can't delete car"));
  }
};

const updateImagesCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldImages = await Car.findById(id);

    if (!oldImages) {
      req.files.map((file) => deleteFile(file.path));
      return next(setError(400, "Car not found ❌"));
    }

    if (oldImages.images && oldImages.images.length > 0) {
      oldImages.images.forEach((image) => deleteFile(image));
    }

    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map((file) => file.path);
      oldImages.images = newImagePaths;
    }

    const updatedCar = await oldImages.save();

    return res.status(201).json({ data: updatedCar });
  } catch (error) {
    req.files.map((file) => deleteFile(file.path));
    return next(setError(401, "Loading of new images has failed"));
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createNewCar,
  updateCar,
  updateImagesCar,
  deleteCar,
};