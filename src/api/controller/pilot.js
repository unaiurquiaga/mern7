const { setError } = require("../../config/error");
const { deleteFile } = require("../../middleware/deletefile");
const Pilot = require("../models/pilot");

const getAllPilots = async (req, res, next) => {
  try {
    const allPilots = await Pilot.find();
    return res.status(200).json({ data: allPilots });
  } catch (error) {
    return next(setError(401, "Can't find pilot"));
  }
};

const getPilotById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pilot = await Pilot.findById(id);

    if (!pilot) {
      return next(setError(400, "Pilot not found"));
    }

    const pilotId = await Pilot.findById(id).populate({
      path: "car",
      select: "_id name images year category",
    });
    return res.status(200).json({ data: pilotId });
  } catch (error) {
    return next(setError(401, "Can't find pilot by ID"));
  }
};

const createNewPilot = async (req, res, next) => {
  try {
    const newPilot = new Pilot(req.body);

    if (req.file) {
      newPilot.image = req.file.path;
    }

    const pilotBBDD = await newPilot.save();
    return res.status(201).json({ data: pilotBBDD });
  } catch (error) {
    deleteFile(req.file.path);
    return next(setError(401, `Can't create new pilot ${error.message}`));
  }
};

const updatePilot = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldPilot = await Pilot.findById(id);

    if (!oldPilot) {
      return next(setError(400, "Pilot not found"));
    }

    const updatePilot = req.body;
    const updateCar = req.body.car;

    if (updateCar) {
      const carsToAdd = Array.isArray(updateCar) ? updateCar : [updateCar];

      const update = {
        $addToSet: {
          car: { $each: carsToAdd },
        },
      };

      const updatedPilot = await Pilot.findByIdAndUpdate(id, update, {
        new: true,
      });

      return res.status(200).json({ data: updatedPilot });
    }

    if (req.file) {
      updatePilot.image = req.file.path;

      if (oldPilot.image) {
        deleteFile(oldPilot.image);
      }
    }

    const updateAllPilot = await Pilot.findByIdAndUpdate(id, updatePilot, {
      new: true,
    });
    return res.status(200).json({ data: updateAllPilot });
  } catch (error) {
    return next(setError(401, "Can't update pilot"));
  }
};

const deletePilot = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pilot = await Pilot.findByIdAndDelete(id);

    if (designer.image) {
      deleteFile(designer.image);
    }

    return res
      .status(200)
      .json({ data: `Removed: ${pilot.name} ${pilot.surname}` });
  } catch (error) {
    return next(setError(401, "Can't delete pilot"));
  }
};

module.exports = {
  getAllPilots,
  getPilotById,
  createNewPilot,
  updatePilot,
  deletePilot,
};