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

  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});

//get token from model, and create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

// @desc Get logged in User
// @route POST /api/v1/auth/me
// @access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});
