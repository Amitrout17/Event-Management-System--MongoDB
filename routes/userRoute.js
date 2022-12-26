const express = require("express");
const { route } = require("../app");
const {
  register,
  login,
  logout,
  updatePassword,
} = require("../controllers/userController");
const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/resetPassword").put(updatePassword);
module.exports = router;
