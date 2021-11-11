const express = require("express");

const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getListingByUserId,
} = require("../controllers/listings");

const furnitureRouter = require("./furnitures");
const locationRouter = require("./locations");
const vehicleFormRouter = require("./categories/vehicles");

const router = express.Router();

//re-route into other resource routers
router.use("/:listingId/furniture", furnitureRouter);
router.use("/:listingId/location", locationRouter);
router.use("/:listingId/vehicle", vehicleFormRouter);

const { protect, authorize } = require("../middleware/protect.auth");

//Listings
router
  .route("/")
  .get(getAllListings)
  .post(protect, authorize("shipper"), createListing);
router
  .route("/:id")
  .get(getListing)
  .put(protect, authorize("shipper"), updateListing)
  .delete(protect, authorize("shipper"), deleteListing);

router.route("/user/:id").get(getListingByUserId);

module.exports = router;
