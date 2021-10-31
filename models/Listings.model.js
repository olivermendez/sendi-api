const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const ListingSchema = new mongoose.Schema(
	{

		title: {
			type: String,
			required: [true, 'Please add a name'],
			unique: true,
			trim: true,
			maxlength: [50, 'Name can not be more than 50 characters'],
		},

		description: {
			type: String,
			required: [true, 'Please add a description'],
			maxlength: [500, 'Description can not be more than 500 characters'],
		},
		
		contact: {
			type: {
				type: String,

			},
			name: String,
			phoneNumber: String,
			email:String,
		},

		phone: {
			type: String,
			maxlength: [20, 'Phone number can not be longer than 20 characters'],
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
		locationTo: {
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

		averageRating: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [10, 'Rating must can not be more than 10'],
		},
		averageCost: Number,
		photo: {
			type: String,
			default: 'no-photo.jpg',
		},
		price: {
			type: Number,
		},

		comodity:{
			type: String,
			default: "Furniture"
		},

		widthInMeters: {
			type: Number,
		},
		lengthInMeters: {
			type: Number,
		},
		heightInMeters: {
			type: Number,
		},
		weightInGrams: {
			type: Number,
		},
		unitCount: {
			type: Number,
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
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Create listing slug from name
//ListingSchema.pre('save', function (next) {
//	this.slug = slugify(this.name, { lower: true });
//	next();
//});

//Geocode & create location field

ListingSchema.pre('save', async function (next) {
	const loc = await geocoder.geocode(this.addressFrom);
	this.locationFrom = {
		type: 'Point',
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
		street: loc[0].streetName,
		city: loc[0].city,
		state: loc[0].stateCode,
		zipcode: loc[0].zipcode,
		country: loc[0].countryCode,
	};
	next();

	//do not save adress in db
	//this.adress = undefined;
});

ListingSchema.pre('save', async function (next) {
	const loc = await geocoder.geocode(this.addressTo);
	this.locationTo = {
		type: 'Point',
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
		street: loc[0].streetName,
		city: loc[0].city,
		state: loc[0].stateCode,
		zipcode: loc[0].zipcode,
		country: loc[0].countryCode,
	};
	next();

	//do not save adress in db
	//this.adress = undefined;
});

module.exports = mongoose.model('Listing', ListingSchema);
