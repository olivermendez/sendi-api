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

const { protect } = require("../middleware/protect.auth");

//Commodities
//router.route('/').get(getCommodities);

//Listings
router.route("/").get(getAllListings).post(protect, createListing);
router
  .route("/:id")
  .get(getListing)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

module.exports = router;
