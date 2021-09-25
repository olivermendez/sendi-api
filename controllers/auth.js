const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const User = require("../models/user.model");

// @desc Register User
// @route GET /api/v1/auth/register
// @access Public
exports.userRegister = asyncHandler(async (req, res, next) => {
  const { name, username, email, password, role } = req.body;
  //Create user
  const user = await User.create({ name, username, email, password, role });

  const token = user.getSignedJwtToken();
  res.status(201).json({ success: true, token });
});
