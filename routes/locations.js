const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createLocations,
  getLocationByListingId,
} = require("../controllers/locations");

//const { protect, authorize } = require("../middleware/protect.auth");

router.route("/").post(createLocations);
router.route("/").get(getLocationByListingId);

module.exports = router;
