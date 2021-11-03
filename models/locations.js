const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const LocationsSchema = new mongoose.Schema(
  {
    addressFrom: {
      type: String,
      required: [true, "Please add an address"],
    },
    locationFrom: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },

    addressTo: {
      type: String,
      required: [true, "Please add an address"],
    },
    locationTo: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },

    listing: {
      type: mongoose.Schema.ObjectId,
      ref: "Listing",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Geocode & create location field

LocationsSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.addressFrom);
  this.locationFrom = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  next();

  //do not save adress in db
  //this.adress = undefined;
});

LocationsSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.addressTo);
  this.locationTo = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  next();

  //do not save adress in db
  //this.adress = undefined;
});

module.exports = mongoose.model("Locations", LocationsSchema);
