// @desc Get All Delivers
// @route GET /api/v1/delivers
// @access Public

exports.getAllDelivers = (req, res, next) => {
	res.status(200).json({ succes: true, msg: 'Show all deliveries' });
};

// @desc Get a Single Deliver
// @route GET /api/v1/delivers/:id
// @access Public
exports.getDeliver = (req, res, next) => {
	res
		.status(200)
		.json({ succes: true, msg: `Show a single deliver ${req.params.id}` });
	console.log('Request Type: ', req.method);
};

// @desc Create a Single Deliver
// @route POST /api/v1/delivers/:id
// @access Private
exports.createDeliver = (req, res, next) => {
	res.status(200).json({ succes: true, msg: 'Create new deliver' });
	console.log('Request Type: ', req.method);
};

// @desc Update a Single Deliver
// @route PUT /api/v1/delivers/:id
// @access Private
exports.updateDeliver = (req, res, next) => {
	res
		.status(200)
		.json({ succes: true, msg: `Update a single deliver ${req.params.id}` });
	console.log('Request Type: ', req.method);
};

// @desc Update a Single Deliver
// @route DELETE /api/v1/delivers/:id
// @access Private
exports.deleteDeliver = (req, res, next) => {
	res
		.status(200)
		.json({ succes: true, msg: `Delete a single deliver ${req.params.id}` });
	console.log('Request Type: ', req.method);
};
