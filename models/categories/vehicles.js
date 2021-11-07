const mongoose = require("mongoose");

const VehicleFormSchema = new mongoose.Schema({
  bodytype: {
    type: String,
  },
  dimensions: {
    type: String,
    //require: true,
  },
  weight: {
    type: String,
  },

  operable: {
    type: Boolean,
    default: true,
  },
  convertible: {
    type: Boolean,
    default: false,
  },

  modified: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  listing: {
    type: mongoose.Schema.ObjectId,
    ref: "Listing",
    required: true,
  },
});

module.exports = mongoose.model("VehicleForm", VehicleFormSchema);
