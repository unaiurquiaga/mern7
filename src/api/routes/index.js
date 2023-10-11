const express = require("express");
const carsRouters = require("./car");
const pilotsRouters = require("./pilot");
const usersRouters = require("./user");

const router = express.Router();

router.use("/car", carsRouters);
router.use("/pilot", pilotsRouters);
router.use("/user", usersRouters);

module.exports = router;