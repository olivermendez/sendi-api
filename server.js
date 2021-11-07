const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

//load env vars
dotenv.config({ path: "./config/config.env" });

//tuto: https://uship.developerhub.io/lookup-values/commodities
//https://documenter.getpostman.com/view/8396530/TVzYeZ75#b1f9bde2-0801-4dec-938a-aca5b6ce0ab8
//Routes files
const listings = require("./routes/listings.js");
const commodities = require("./routes/commodities");
const auth = require("./routes/auth");
const logger = require("./middleware/logger");
const vehicle = require("./routes/vehicles");
const payment = require("./routes/payment");
const furniture = require("./routes/furnitures");
const bodytype = require("./routes/bodytypes");

//Connection to database
connectDB();

const app = express();

//req body
app.use(express.json());
app.use(cookieParser());

//middleware
app.use(logger);

// Dev loggin middleware
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}
//Routes Listing
app.use("/api/v1/listings/", listings);

//Route Vehicle
app.use("/api/v1/vehicles/", vehicle);

//Route Payment
app.use("/api/v1/payment/", payment);

//Route: Authentication
app.use("/api/v1/auth/", auth);
//Routes Commodities
app.use("/api/v1/lookups/commodities/", commodities);

app.use("/api/v1/vehicle/bodytypes", bodytype);

//Categories
//Furnitures
app.use("/api/v1/furnitures", furniture);

app.use(errorHandler);

const server = app.listen(
  process.env.PORT,
  console.log(`server running on localhost:${process.env.PORT}`.yellow.bold)
);

//Handle unhandled promise rejections
process.on("unhandleRejection", (err, promise) => {
  console.log(`unhandled Rejection: Error: ${err.message}`.red);
  //conse server & exit procees.
  server.close(() => process.exit(1));
});
