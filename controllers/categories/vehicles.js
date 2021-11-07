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
exports.getFurniture = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.listingId) {
    console.log(req.params.listingId);
    query = Furniture.find({ listing: req.params.listingId }).populate(
      "listing"
    );
  } else {
    query = Furniture.find();
  }

  const furnitures = await query;

  res.status(200).json({
    success: true,
    count: furnitures.length,
    data: furnitures,
  });
});
