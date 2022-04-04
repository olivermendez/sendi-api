const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createVehicleForm,
  getVehicleDetails,
} = require("../../controllers/categories/vehicles");

const { protect, authorize } = require("../../middleware/protect.auth");

//router.route("/").get(getFurniture);
router.route("/").post(protect, authorize("shipper"), createVehicleForm);
router.route("/").get(getVehicleDetails);

module.exports = router;
