const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
	cardNumber: {
		type: Number,
		required: [true, 'Plase add card number'],
	},
	expirationDate: {
		type: String,
		require: true,
		
	},
	cvv: {
		type: String,
		required: true,
	},

	cardHolder: {
		type: String,
		required: true,
	},

    amount: {
        type: Number,
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

module.exports = mongoose.model('Payment', PaymentSchema);
