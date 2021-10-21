const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
	year: {
		type: Number,
		required: [true, 'Plase add car year'],
		min: 2000,
		max: 2022,
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

	imageUrl: {
		type: String,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
