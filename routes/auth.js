const express = require('express');
const router = express.Router();
const { userRegister } = require('../controllers/auth');

router.post('/register', userRegister);

module.exports = router;
