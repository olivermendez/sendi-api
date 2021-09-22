const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	console.log(err);

	//bad objectid
	if (err.name === 'CastError') {
		const message = `Resources not found with id: ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	// mongoose duplicate key
	if (err.code === 11000) {
		const message = `Duplicated field value entered`;
		error = new ErrorResponse(message, 400);
	}

	//mongoose validation errors
	if (err.name === 'ValidatorError') {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	res
		.status(error.statusCode || 500)
		.json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
