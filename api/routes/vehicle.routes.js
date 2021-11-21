const router = require('express').Router();
const { Vehicle } = require('../models/vehicle.model');

router.get('/api/vehicle', async (req, res) => {
    const vehicle = await Vehicle.find({});
    res.send(vehicle);
});

exports.router = router;  
/*
const vehicleRouter = require("express").Router();
const vehicleControllers = require("../../controllers/vehicle-controller");

vehicleRouter.get("/vehicles", vehicleControllers.getVehicles);
vehicleRouter.get("/vehicles/:id", vehicleControllers.getVehicle);
vehicleRouter.post("/vehicles", vehicleControllers.createVehicle);
vehicleRouter.delete("/vehicles/:id", vehicleControllers.deleteVehicle);

module.exports = vehicleRouter;
*/
