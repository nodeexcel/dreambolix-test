const express = require("express");
const router = express.Router();
const {
  validateRegistration,
  validateLogin,
  validateRefresh,
  validateAuth,
} = require("../middleware");
const { auth } = require("../controllers");
router.post("/register", validateRegistration, auth.registerUser);
router.post("/login", validateLogin, auth.login);
router.post("/getAuth", validateRefresh, auth.getToken);
router.post("/logout", validateAuth, auth.logout);

module.exports = router;
