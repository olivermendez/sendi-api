const express = require('express');
const dotenv = require('dotenv');

//Routes files
const delivers = require('./routes/delivers.js');

//load env vars
dotenv.config({ path: './config/config.env' });

//port
const PORT = process.env.PORT || 5000;

const app = express();

app.use('/api/v1/delivers/', delivers);

app.listen(
	PORT,
	console.log(`server running on localhost:${process.env.PORT}`)
);
