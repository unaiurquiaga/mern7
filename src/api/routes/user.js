const express = require("express");
const {
  register,
  login,
  getAllUsers,
  deleteUser,
  createAvatar,
} = require("../controller/user");
const upload = require("../../middleware/file");
const { isAuth } = require("../../middleware/auth");

const usersRouters = express.Router();

usersRouters.get("/", getAllUsers);
usersRouters.post("/auth/register", [isAuth], upload.single("avatar"), register);
usersRouters.post("/auth/login", login);
usersRouters.post("/auth/avatar/:id", [isAuth], upload.single("avatar"), createAvatar);
usersRouters.delete("/:id", [isAuth], deleteUser);

module.exports = usersRouters;