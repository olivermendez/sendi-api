const express = require('express');
const dotenv = require('dotenv');

//load env vars

dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, console.log(`server running on port ${process.env.PORT} mode on port ${PORT}`))



