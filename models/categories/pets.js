const mongoose = require("mongoose");

const PetsQuestionSchema = new mongoose.Schema({
  //Kennel Transit Box
  length: {
    type: Number,
    //require: true,
  },
  width: {
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

module.exports = mongoose.model("Pets", PetsQuestionSchema);
