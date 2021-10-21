const express = require("express");
const router = express.Router();

const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listings");

const { protect, authorize } = require("../middleware/protect.auth");

//Listings
router.route("/").get(protect, authorize('carrier'), getAllListings).post(protect, authorize('shipper'), createListing);
router
  .route("/:id")
  .get(getListing)
  .put(protect, authorize('shipper'), updateListing)
  .delete(protect, authorize('shipper'), deleteListing);

module.exports = router;
