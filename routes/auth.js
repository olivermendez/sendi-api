const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controllers/auth");

router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
