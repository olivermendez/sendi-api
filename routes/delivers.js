const express = require('express');
const router = express.Router();

const {
	getAllDelivers,
	getDeliver,
	createDeliver,
	updateDeliver,
	deleteDeliver,
} = require('../controllers/delivers');

router.route('/').get(getAllDelivers).post(createDeliver);

router.route('/:id').get(getDeliver).put(updateDeliver).delete(deleteDeliver);

module.exports = router;
