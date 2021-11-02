const express = require("express");




const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  
} = require("../controllers/listings");

const furnitureRouter = require('./furnitures');


const router = express.Router();


//re-route into other resource routers
router.use('/:listingId/furniture', furnitureRouter);

const { protect, authorize } = require("../middleware/protect.auth");

//Listings
router.route("/").get(getAllListings).post(protect, authorize('shipper'), createListing);
router
  .route("/:id")
  .get(getListing)
  .put(protect, authorize('shipper'), updateListing)
  .delete(protect, authorize('shipper'), deleteListing);

module.exports = router;
