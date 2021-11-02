const express = require("express");
const router = express.Router();


const {addPaymentMethod, deletePaymentMethod, getPaymentMethodsByUserId, createFurnitures } = require("../controllers/payment");

const { protect, authorize } = require("../middleware/protect.auth");


router.route('/').post(protect, authorize('carrier'), addPaymentMethod);

router.route('/furniture').post(protect, authorize('carrier'), createFurnitures);

router.route("/:id").delete(protect, authorize('carrier'), deletePaymentMethod);
router.route('/:id').get(getPaymentMethodsByUserId);
//router.route("/:id").get(protect, authorize('carrier'), getVehicleByUserId);

module.exports = router;