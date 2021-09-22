const Listing = require('../models/Listings.model');
const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get All Listings
// @route GET /api/v1/listings
// @access Public
exports.getAllListings = asyncHandler(async (req, res, next) => {
	const getlistings = await Listing.find();
	res
		.status(201)
		.json({ success: true, count: getlistings.length, data: getlistings });
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
	const createlisting = await Listing.create(req.body);
	res.status(201).json({ success: true, data: createlisting });
});

// @desc Update a Single Listing
// @route PUT /api/v1/Listings/:id
// @access Private
exports.updateListing = asyncHandler(async (req, res, next) => {
	const updatelisting = await Listing.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true, runValidators: true }
	);
	res.status(201).json({ success: true, data: updatelisting });

	if (!updatelisting) {
		return next(
			new errorResponse(`Listing not found with id: ${req.params.id}`, 404)
		);
	}
});

// @desc Update a Single Listing
// @route DELETE /api/v1/Listings/:id
// @access Private
exports.deleteListing = asyncHandler(async (req, res, next) => {
	const deletelisting = await Listing.findByIdAndDelete(req.params.id);

	if (!deletelisting) {
		return next(
			new errorResponse(`Listing not found with id: ${req.params.id}`, 404)
		);
	}
	res.status(201).json({ success: true, msg: 'Deleted' });
});
