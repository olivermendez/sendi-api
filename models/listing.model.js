const mongoose = require('mongoose');

const CreateListingSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			emun: ['Active', 'Inactive'],
		},
		namedPrice: {
			type: Number,

			currencyType: {
				type: String,
				emun: ['USD', 'DOP'],
			},
		},
		offerPrice: {
			type: Number,
			currencyType: {
				type: String,
				emun: ['USD', 'DOP'],
			},
		},
		commodity: {
			type: String,
		},
		parentCommodity: {
			type: String,
		},
		expireOn: {
			type: Date,
			default: Date.now,
		},

		imageUrl: {
			type: String,
		},

		createOn: {
			type: Date,
			default: Date.now,
		},

		lastupdateOn: {
			type: Date,
			default: Date.now,
		},

		title: {
			type: String,
		},

		description: {
			type: String,
		},

		addressFrom: {
			type: String,
			required: [true, 'Please add an address'],
		},
		locationFrom: {
			// GeoJSON Point
			type: {
				type: String,
				enum: ['Point'],
			},
			coordinates: {
				type: [Number],
				index: '2dsphere',
			},
			formattedAddress: String,
			street: String,
			city: String,
			state: String,
			zipcode: String,
			country: String,
		},

		addressTo: {
			type: String,
			required: [true, 'Please add an address'],
		},
		locationTrom: {
			// GeoJSON Point
			type: {
				type: String,
				enum: ['Point'],
			},
			coordinates: {
				type: [Number],
				index: '2dsphere',
			},
			formattedAddress: String,
			street: String,
			city: String,
			state: String,
			zipcode: String,
			country: String,
		},

		phone: {
			type: String,
			maxlength: [20, 'Phone number can not be longer than 20 characters'],
		},

		distance: {
			type: Number,
		},
		shipPrice: {
			type: Number,
		},

		averageCost: Number,

		attributes: {
			lengthInMeters: {
				type: String,
			},
			widthInMeters: {
				type: String,
			},
			heightInMeters: {
				type: String,
			},
			weightInGrams: {
				type: String,
			},
			unitCount: {
				type: Number,
			},
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Create listing slug from name
ListingSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

module.exports = mongoose.model('ListingDB', CreateListingSchema);
