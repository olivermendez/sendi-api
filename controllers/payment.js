const Payment = require("../models/payment");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc Add a Payment Method
// @route POST /api/v1/payment/
// @access Private ['carrier', 'shipper']
exports.addPaymentMethod = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  console.log(req.body);

  const newPayment = await Payment.create(req.body);
  res.status(201).json({ success: true, data: newPayment });
});

// @desc Add a Payment Method
// @route POST /api/v1/payment/
// @access Private ['carrier', 'shipper']
exports.deletePaymentMethod = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const deletePayment = await Payment.findById(req.params.id);

  if (!deletePayment) {
    return next(
      new errorResponse(`This Payment not found with id: ${req.params.id}`, 404)
    );
  }

  deletePayment.remove();

  res.status(201).json({ success: true, data: newPayment });
});
