const express = require("express");
const router = express.Router();


const {addPaymentMethod, deletePaymentMethod } = require("../controllers/payment");

const { protect, authorize } = require("../middleware/protect.auth");


router.route('/').post(protect, authorize('carrier'), addPaymentMethod);

router.route("/:id").delete(protect, authorize('carrier'), deletePaymentMethod);
//router.route("/:id").get(protect, authorize('carrier'), getVehicleByUserId);

module.exports = router;