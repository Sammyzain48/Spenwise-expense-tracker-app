const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const {
  registerUser,
  loginUser,
  refresh,
  deleteUser,
  logout,
} = require("../controllers/auth-controllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", refresh);
router.post("/delete", authMiddleware, deleteUser);
router.post("/logout", logout);

module.exports = router;
