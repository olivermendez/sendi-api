const express = require("express");
const router = express.Router();


const { createVehicle, deleteVehicle, getVehicleByUserId } = require("../controllers/vehicle");

const { protect, authorize } = require("../middleware/protect.auth");


router.route('/').post(protect, authorize('carrier'), createVehicle);

router.route("/:id").delete(protect, authorize('carrier'), deleteVehicle);
router.route("/:id").get(protect, authorize('carrier'), getVehicleByUserId);

module.exports = router;