const express = require("express");
const router = express.Router({ mergeParams: true });

const { createLocations } = require("../controllers/locations");

//const { protect, authorize } = require("../middleware/protect.auth");

//router.route('/').get(getFurniture);
router.route("/").post(createLocations);

module.exports = router;
