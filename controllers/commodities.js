// @desc Get Options
// @route GET /api/v1/lookups/commodities
// @access Prublic

const options = require('../_data/options/commodities.json');

exports.getCommodities = (req, res, next) => {
	res
		.status(200)
		.json({ succes: true, msg: 'Show all Commodities!!', data: options });
};
