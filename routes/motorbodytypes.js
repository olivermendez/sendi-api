const express = require("express");
const routerMotorBodyType = express.Router();

const { getMotorBodyTypes } = require("../controllers/motorbodytypes");

//motor body types
routerMotorBodyType.route("/").get(getMotorBodyTypes);

module.exports = routerMotorBodyType;
