const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
	year: {
		type: Number,
		required: true,
		//min: 2000,
		//max: 2022,
	},
	make: {
		type: String,
		require: true,
		//enum: ['Acura', 'Honda'],
	},
	model: {
		type: String,
		required: true,
		//enum: ['Acura', 'Honda'],
	},

	licence: {
		type: String,
		required: true,
	},

	createdAt: {
		type: String,
		default: Date.now,
	},
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
