const express = require('express');
const router = express.Router( {mergeParams: true});

const {
    createFurnitures,
    getFurniture
} = require('../controllers/furnitures');

const { protect, authorize } = require("../middleware/protect.auth");


router.route('/').get(getFurniture);
router.route('/').post(protect, authorize('shipper'), createFurnitures);


module.exports = router;