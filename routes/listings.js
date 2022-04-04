const express = require("express");

const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getListingByUserId,
  getListingByUserIdByState,
  getListingByDriverIdByState,
} = require("../controllers/listings");

const { getLocationByListingId } = require("../controllers/locations");

const furnitureRouter = require("./furnitures");
const locationRouter = require("./locations");
const vehicleFormRouter = require("./categories/vehicles");

const router = express.Router();

//re-route into other resource routers
router.use("/:listingId/furniture", furnitureRouter);
router.use("/:listingId/location", locationRouter);
router.use("/:listingId/vehicle", vehicleFormRouter);

//router.get("/:id/vehicle", getLocationByListingId);

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

router.route("/user/:id/:status").get(getListingByUserIdByState);
router.route("/driver/:id/:status").get(getListingByDriverIdByState);

module.exports = router;
