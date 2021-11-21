const router = require('express').Router();
const { Cargo_info } = require('../models/cargo_info.model');

router.get('/api/cargo_info/center/:center_id/vehicle/:vehicle_id', async (req, res) => {
    const cargo_info = await Cargo_info.find({"center_id" : req.params.center_id, "vehicle_id" : req.params.vehicle_id});
    res.send(cargo_info);
});

router.get('/api/delivery_started/center/:center_id/vehicle/:vehicle_id', async(req, res) => {
    const updateMany = await Cargo_info.updateMany({ "center_id": req.params.center_id, "vehicle_id": req.params.vehicle_id }, { $set: { "status_id": 2 }})
    res.send(updateMany)
});

router.get('/api/delivered/:cargo_id', async(req, res) => {
    const delivered = await Cargo_info.updateOne({ "cargo_id": req.params.cargo_id}, {$set: {"status_id": 3}})
    res.send(delivered)
})

exports.router = router; 
