const express = require("express");
const router = express.Router();

//const { getCommodities } = require('../controllers/commodities');
const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listings");

const { protect, authorize } = require("../middleware/protect.auth");

//Commodities
//router.route('/').get(getCommodities);

//Listings
router.route("/").get(protect, authorize('carrier'), getAllListings).post(protect, authorize('shipper'), createListing);
router
  .route("/:id")
  .get(getListing)
  .put(protect, authorize('shipper'), updateListing)
  .delete(protect, authorize('shipper'), deleteListing);

module.exports = router;
