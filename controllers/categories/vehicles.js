const asyncHandler = require("../../middleware/async");
const Furniture = require("../../models/furniture");
const Listing = require("../../models/Listings.model");
const ErrorResponse = require("../../utils/errorResponse");
const VehicleForm = require("../../models/categories/vehicles");

// @desc Create a single Vehicle's detail for single Listing
// @route POST /api/v1/listings/:listingId/vehicle
// @access private
exports.createVehicleForm = asyncHandler(async (req, res, next) => {
  req.body.listing = req.params.listingId;

  const listing = await Listing.findById(req.params.listingId);

  if (!listing) {
    return next(new ErrorResponse(`No listing found`, 400));
  }

  const vehicleform = await VehicleForm.create(req.body);

  res.status(201).json({ success: true, added: vehicleform });
});

// @desc Get all furniture
// @route GET /api/v1/listings/:listingId/furniture
// @access Public
exports.getVehicleDetails = asyncHandler(async (req, res, next) => {
  let details = await VehicleForm.find({ listing: req.params.listingId });

  if (!details) {
    return next(new ErrorResponse(`No details found`, 400));
  }
  res.status(201).json({ success: true, details: details });
});
