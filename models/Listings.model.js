const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");
const Furniture = require("./furniture");
const locations = require("./locations");

const ListingSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["active", "booked", "closed", "delivered", "archived", "saved"],
      default: "active",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },

    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },

    quantity: {
      type: String,
      default: "1",
    },

    photo: {
      type: String,
      default:
        "https://luxloungeefr.com/wp-content/uploads/2015/03/blue-custom.png",
    },
    comodity: {
      type: String,
      enum: [
        "boast",
        "vehicles",
        "pets",
        "other",
        "motorcycles",
        "household",
        "animals",
      ],
      default: "household",
    },

    subcomodity: {
      type: String,
      //enum: ["furniture", "vehicles", "pets", "other", "motorcycles", "household"],
      default: "furniture",
    },

    driverId: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete courses when a listing is deleted
ListingSchema.pre("remove", async function (next) {
  console.log(`Listing removed ${this._id}`);
  const funiture = await Furniture.deleteMany({ listing: this._id });

  //const location = await locations.deleteMany({ listing: this._id });

  //await this.model("VehicleForm").deleteMany({ listing: this._id });
  next();
});

ListingSchema.virtual("furnitures", {
  ref: "Furnitures",
  localField: "_id",
  foreignField: "listing",
  justOne: false,
});

// Create listing slug from name
//ListingSchema.pre('save', function (next) {
//	this.slug = slugify(this.name, { lower: true });
//	next();
//});

//Geocode & create location field

//ListingSchema.pre("save", async function (next) {
/// const loc = await geocoder.geocode(this.addressFrom);
// this.locationFrom = {
//   type: "Point",
//   coordinates: [loc[0].longitude, loc[0].latitude],
//    formattedAddress: loc[0].formattedAddress,
//   street: loc[0].streetName,
//    city: loc[0].city,
//   state: loc[0].stateCode,
//    zipcode: loc[0].zipcode,
//   country: loc[0].countryCode,
// };
// next();

//do not save adress in db
//this.adress = undefined;
//});

//ListingSchema.pre("save", async function (next) {
// const loc = await geocoder.geocode(this.addressTo);
//  this.locationTo = {
//   type: "Point",
//   coordinates: [loc[0].longitude, loc[0].latitude],
//    formattedAddress: loc[0].formattedAddress,
//   street: loc[0].streetName,
//   city: loc[0].city,
//   state: loc[0].stateCode,
//   zipcode: loc[0].zipcode,
//   country: loc[0].countryCode,
// };
// next();

//do not save adress in db
//this.adress = undefined;
//});

module.exports = mongoose.model("Listing", ListingSchema);
