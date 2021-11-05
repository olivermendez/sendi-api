const mongoose = require("mongoose");

const FurnitureQuestionSchema = new mongoose.Schema({
  length: {
    type: Number,
    //require: true,
  },
  width: {
    type: Number,
    //required: true,
  },

  height: {
    type: Number,
    //required: true,
  },

  weight: {
    type: Number,
    //required: true,
  },

  listing: {
    type: mongoose.Schema.ObjectId,
    ref: "Listing",
    required: true,
  },
});

module.exports = mongoose.model("Furnitures", FurnitureQuestionSchema);
