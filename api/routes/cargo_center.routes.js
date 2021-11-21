const router = require('express').Router();
const { Cargo_center } = require('../models/cargo_center.model');

router.get('/api/cargo_center/:id', async (req, res) => {
    const cargo_center = await Cargo_center.find({ center_id: req.params.id });
    res.send(cargo_center[0]);
});

router.get('/api/cargo_center', async (req, res) => {
    const cargo_center = await Cargo_center.find({});
    res.send(cargo_center);
});

exports.router = router; 
/*

const cargo_centerRouter = require("express").Router();
const cargo_centerControllers = require("../../controllers/cargo_center-controller");

cargo_centerRouter.get("/cargo_center", cargo_centerControllers.getCargo_center);
cargo_centerRouter.get("/cargo_center/:id", cargo_centerControllers.getCargo_center);
cargo_centerRouter.post("/cargo_center", cargo_centerControllers.createCargo_center);
cargo_centerRouter.delete("/cargo_center/:id", cargo_centerControllers.deleteCargo_center);

module.exports = cargo_centerRouter;
*/