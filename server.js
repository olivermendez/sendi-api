const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//Routes files
const delivers = require('./routes/delivers.js');

//Connect to database
connectDB();

//port
const PORT = process.env.PORT || 5000;

const app = express();

//midleware

// Dev loggin middleware
if (process.env.NODE_ENV === 'developement') {
	app.use(morgan('dev'));
}

app.use('/api/v1/delivers/', delivers);

const server = app.listen(
	PORT,
	console.log(`server running on localhost:${process.env.PORT}`.yellow.bold)
);

//handle unhandled promise rejections

process.on('unhandleRejection', (err, promise) => {
	console.log(`unhandled Rejection: Error: ${err.message}`.red);
	//conse server & exit procees.
	server.close(() => process.exit(1));
});
