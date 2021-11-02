const mongoose = require('mongoose');

const FurnitureQuestionSchema = new mongoose.Schema({
	type: {
		type: String,
		default: 'Furniture'
	},
	length: {
		type: Number,
		//require: true,
		
	},
	width: {
		type: Number,
		//required: true,
	},

    measure: {
		type: Number,
		//required: true,
	},

    weight: {
        type: Number,
        //required: true,
    },

    weightMeasure: {
        type: String,
        //required: true,
    },

	listing: {
		type: mongoose.Schema.ObjectId,
		ref: 'Listing',
		required: true,
	},

	

	
});

module.exports = mongoose.model('Furnitures', FurnitureQuestionSchema);
