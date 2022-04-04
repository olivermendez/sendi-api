const asyncHandler = require("../middleware/async");
const Furniture = require("../models/furniture");
const Listing = require("../models/Listings.model");
const ErrorResponse = require("../utils/errorResponse");

// @desc Create a single Furniture's detail
// @route POST /api/v1/listings/:listingId/furniture
// @access private
exports.createFurnitures = asyncHandler(async (req, res, next) => {
  req.body.listing = req.params.listingId;

  const listing = await Listing.findById(req.params.listingId);

  if (!listing) {
    return next(new ErrorResponse(`No listing found`, 400));
  }

  const furniture = await Furniture.create(req.body);

  res.status(201).json({ success: true, data: furniture });
});

// @desc Get all furniture
// @route GET /api/v1/listings/:listingId/furniture
// @access Public
exports.getFurniture = asyncHandler(async (req, res, next) => {
  let furniture = await Furniture.find({ listing: req.params.listingId });

  if (!furniture) {
    return next(new ErrorResponse(`No details found`, 400));
  }
  res.status(201).json({ success: true, furniture: furniture });
});
