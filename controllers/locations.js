const asyncHandler = require("../middleware/async");
const Location = require("../models/locations");
const Listing = require("../models/Listings.model");
const ErrorResponse = require("../utils/errorResponse");

// @desc Create a single Furniture's detail
// @route POST /api/v1/listings/:listingId/location
// @access private
exports.createLocations = asyncHandler(async (req, res, next) => {
  req.body.listing = req.params.listingId;

  const listing = await Listing.findById(req.params.listingId);

  if (!listing) {
    return next(new ErrorResponse(`No listing found`, 400));
  }

  const locations = await Location.create(req.body);

  res.status(201).json({ success: true, data: locations });
});

// @desc Get a Single Listing location by listing
// @route GET /api/v1/listings/:listingId/location
// @access Public
exports.getLocationByListingId = asyncHandler(async (req, res, next) => {
  const getlocation = await Location.find({
    listing: req.params.listingId,
  });

  if (!getlocation) {
    return next(
      new errorResponse(`Location not found with id: ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data: getlocation });
});
