
//const errorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../middleware/async");
//const Listings = require("../../models/Listings.model");
const Furniture = require("../models/furniture");
const Listing = require('../models/Listings.model');
const ErrorResponse = require("../utils/errorResponse");

// @desc Create a single Furniture's detail
// @route POST /api/v1/listings/:listingId/furniture
// @access Public
exports.createFurnitures = asyncHandler(async (req, res, next) => {

  req.body.listing = req.params.listingId;

  const listing = await Listing.findById(req.params.listingId);

  if(!listing){
    return next(new ErrorResponse(`No listing found`, 400));
  }

  const furniture = await Furniture.create(req.body);

  res.status(201).json({ success: true, data: furniture });
});



// @desc Get All Listings by Listing
// @route GET /api/v1/listings/:listingId/furniture
// @access Public
exports.getFurniture = asyncHandler(async (req, res, next) => {
  
  let query;

  if(req.params.listingId){
    console.log(req.params.listingId);
    query = Furniture.find({listing: req.params.listingId});
  }else{
    query = Furniture.find();
  }

  const furnitures = await query;



  res.status(200).json({
    success: true,
    count: furnitures.length,
    data: furnitures
  })

});

