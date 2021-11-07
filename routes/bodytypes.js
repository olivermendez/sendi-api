const express = require("express");
const routerBodyType = express.Router();

const { getBodyTypes } = require("../controllers/bodytype");

//Commodities
routerBodyType.route("/").get(getBodyTypes);

module.exports = routerBodyType;
