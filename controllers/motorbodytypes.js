// @desc Get Options
// @route GET /api/v1/motor/bodytypes
// @access Prublic

const options = require("../_data/options/motorbodytype.json");

exports.getMotorBodyTypes = (req, res, next) => {
  res.status(200).json({ succes: true, options });
};
