const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please add your name'],
	},
	username: {
		type: String,
		//require: true,
		//unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},

	role: {
		type: String,
		enum: ['Carrier', 'Shipper'],
		default: 'Shipper',
	},
	password: {
		type: String,
		required: [true, 'Plase add you password'],
		select: false,
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,

	createdAt: {
		type: String,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', UserSchema);
