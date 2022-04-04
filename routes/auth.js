const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  getMe,
  getUserById,
} = require("../controllers/auth");

const { protect } = require("../middleware/protect.auth");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/me", protect, getMe);
router.get("/user/:id", getUserById);

module.exports = router;
