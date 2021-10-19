const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name"],
  },
  username: {
    type: String,
    required: [true, "Please add your username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["carrier", "shipper"],
    default: "shipper",
  },
  phone:{
    type: String,
    required: [true, "Please add your phone number"],
    unique: true,
  },
  cedula:{
    type:String,
    required: [true, "Please add your cedula"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Plase add you password"],
    select: false,
    minlengh: 6,
    select: false,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//cryt the password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed possword in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
