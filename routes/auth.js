const express = require("express");
const router = express.Router();
const { userRegister, userLogin, getMe } = require("../controllers/auth");

const { protect } = require("../middleware/protect.auth");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/me", protect, getMe);

module.exports = router;
