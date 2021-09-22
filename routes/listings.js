const express = require('express');
const router = express.Router();

const { getCommodities } = require('../controllers/commodities');
const {
	getAllListings,
	getListing,
	createListing,
	updateListing,
	deleteListing,
} = require('../controllers/listings');

//Commodities
//router.route('/').get(getCommodities);

//Listings
router.route('/').get(getAllListings).post(createListing);
router.route('/:id').get(getListing).put(updateListing).delete(deleteListing);

module.exports = router;
