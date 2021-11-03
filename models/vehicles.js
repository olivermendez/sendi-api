const mongoose = require("mongoose");

const VehicleQuestionSchema = new mongoose.Schema({
  make: {
    type: String,
    default: "Furniture",
  },
  model: {
    type: String,
    //require: true,
  },
  listing: {
    type: mongoose.Schema.ObjectId,
    ref: "Listing",
    required: true,
  },
});

module.exports = mongoose.model("Vehicles", VehicleQuestionSchema);
