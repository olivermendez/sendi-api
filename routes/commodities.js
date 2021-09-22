const express = require('express');
const routerCommodities = express.Router();

const { getCommodities } = require('../controllers/commodities');

//Commodities
routerCommodities.route('/').get(getCommodities);

module.exports = routerCommodities;
