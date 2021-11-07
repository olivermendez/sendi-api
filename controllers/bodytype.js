// @desc Get Options
// @route GET /api/v1/vehicle/bodytypes
// @access Prublic

const options = require("../_data/options/bodytype.json");

exports.getBodyTypes = (req, res, next) => {
  res.status(200).json({ succes: true, options });
};
