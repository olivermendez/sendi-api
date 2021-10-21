const Vehicle = require('../models/vehicle.model');
const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Add a Vehicle
// @route POST /api/v1/vehicle/
// @access Private ['carrier]
exports.createVehicle = asyncHandler(async (req, res, next) => {
	//add user to req,body

    req.body.user = req.user.id;

    const vehicle = await Vehicle.create(req.body);

	res.status(201).json({ success: true, data: vehicle});
});


// @desc Add a Vehicle
// @route POST /api/v1/vehicle/
// @access Private ['carrier]
exports.deleteVehicle = asyncHandler(async (req, res, next) => {
	const vehicle = await Vehicle.findById(req.params.id);

    if(!vehicle){
        return next(
			new errorResponse(`Vehicle not found with id: ${req.params.id}`, 404)
		);
    }


    if(vehicle.user.toString() !== req.user.id){
		return next(
			new errorResponse(`You are not the Owner, so, you're not authorized to delete this listing`, 401)
		);
	}

    vehicle.remove();

	res.status(201).json({ success: true, msg: "deleted"});
});




// @desc Create a Vehicle
// @route POST /api/v1/vehicle/
// @access Private
exports.getVehicleByUserId = asyncHandler(async (req, res, next) => {


    let queryVehicle = await Vehicle.find({user: req.params.id});

    if(!queryVehicle){
        return next(
			new errorResponse(`Vehicle not found with id: ${req.params.id}`, 404)
		);
    }


	//req.body.user = req.user.id;

	//const publishedVehicles = await Vehicle.findOne({user: req.user.id});

	//const createVehicle = await Vehicle.create(req.body);

	res.status(201).json({ success: true, yourVehicles: queryVehicle});
});




// @desc Get Vehicle
// @route GET /api/v1/vehicle/:userId/vehicle
// @access Public
//exports.getVehicle = asyncHandler(async(req, res, next) => {

 //   let query;

 //   if(req.params.userId){
 //       query = Vehicle.find({user: req.params.userId});
 //   }else{
//        query = Vehicle.find();
//    }

 //   const vehicles = await query;

 //   res.status(200).json({
 //       success: true,
 //       count: vehicles.length,
    //    data: vehicles
 //   })


//});