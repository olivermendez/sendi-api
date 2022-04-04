const Listing = require("../models/Listings.model");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc Get All Listings
// @route GET /api/v1/listings
// @access Public
exports.getAllListings = asyncHandler(async (req, res, next) => {
  const getlistings = await Listing.find();
  res.status(201).json({ qty: getlistings.length, listing: getlistings });
});

// @desc Get a Single Listing
// @route GET /api/v1/listings/:id
// @access Public
exports.getListing = asyncHandler(async (req, res, next) => {
  const getlisting = await Listing.findById(req.params.id);

  if (!getlisting) {
    return next(
      new errorResponse(`Listing not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(201).json({ success: true, data: getlisting });
});

// @desc Create a Single Listing
// @route POST /api/v1/Listings/:id
// @access Private
exports.createListing = asyncHandler(async (req, res, next) => {
  //add user to req,body

  req.body.user = req.user.id;

  const publishedListing = await Listing.findOne({
    user: req.user.id,
  }).populate("user");

  const createlisting = await Listing.create(req.body);

  res.status(201).json({ success: true, listing: createlisting });
});

// @desc Update a Single Listing
// @route PUT /api/v1/Listings/:id
// @access Private
exports.updateListing = asyncHandler(async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(
      new errorResponse(`Listing not found with id: ${req.params.id}`, 404)
    );
  }

  /*

  //Make sure if user if the owner
  if (listing.user.toString() !== req.user.id) {
    return next(
      new errorResponse(
        `${req.params.name} You are not authorized to update this listing`,
        401
      )
    );
  }

  */

  listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data: listing });
});

// @desc Update a Single Listing
// @route DELETE /api/v1/Listings/:id
// @access Private
exports.deleteListing = asyncHandler(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(
      new errorResponse(`Listing not found with id: ${req.params.id}`, 404)
    );
  }

  if (listing.user.toString() !== req.user.id) {
    return next(
      new errorResponse(
        `You are not the Owner, so, you're not authorized to update this listing`,
        401
      )
    );
  }

  listing.remove();

  res.status(201).json({ success: true, msg: "Deleted" });
});

// @desc get listing by User ACTIVED
// @route GET /api/v1/Listings/user/:id
// @access Private
exports.getListingByUserId = asyncHandler(async (req, res, next) => {
  let listing = await Listing.find({ user: req.params.id });

  if (!listing) {
    return next(
      new errorResponse(`Listing not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(201).json({ success: true, listing: listing });
});

// @desc get listing by User BY STATE
// @route GET /api/v1/Listings/user/:id/status
// @access Private
exports.getListingByUserIdByState = asyncHandler(async (req, res, next) => {
  let listing = await Listing.find({
    user: req.params.id,
    status: req.params.status,
  });

  if (!listing) {
    return next(
      new errorResponse(`Listing not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(201).json({ success: true, listing: listing });
});

// @desc get listing by DriverId and BY STATE
// @route GET /api/v1/Listings/driver/:id/status
// @access Private
exports.getListingByDriverIdByState = asyncHandler(async (req, res, next) => {
  let listing = await Listing.find({
    driverId: req.params.id,
    status: req.params.status,
  });

  if (!listing) {
    return next(
      new errorResponse(`Listing not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(201).json({ qty: listing.length, listing: listing });
});
