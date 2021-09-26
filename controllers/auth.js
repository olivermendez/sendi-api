const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");

// @desc Register User
// @route POST /api/v1/auth/register
// @access Public
exports.userRegister = asyncHandler(async (req, res, next) => {
  const { name, username, email, password, role } = req.body;
  //Create user
  const user = await User.create({ name, username, email, password, role });

  const token = user.getSignedJwtToken();
  res.status(201).json({ success: true, token });
});

// @desc Login User
// @route GET /api/v1/auth/login
// @access Public
exports.userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  //check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = user.getSignedJwtToken();
  res.status(201).json({ success: true, token });
});
