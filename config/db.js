const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const URI = process.env.MONGODB_URL;

const connectDB = async () => {
	const conn = await mongoose.connect(URI, (err) => {
		if (err) throw err;
		console.log(`Mongodb Connected`.cyan.underline.bold);
	});

	//console.log(`Mongodb Connected ${conn.connection.ho}`);
};

module.exports = connectDB;
