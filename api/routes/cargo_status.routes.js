const router = require('express').Router();
const { Cargo_status } = require('../models/cargo_status.model');

router.get('/api/cargo_status', async (req, res) => {
    const cargo_status = await Cargo_status.find({});
    res.send(cargo_status);
});

exports.router = router; 
/*  

const cargo_statusRouter = require("express").Router();
const cargo_statusControllers = require("../../controllers/cargo_status-controller");

cargo_statusRouter.get("/cargo_status", cargo_statusControllers.getCargo_status);
cargo_statusRouter.get("/cargo_status/:id", cargo_statusControllers.getCargo_status);
cargo_statusRouter.post("/cargo_status", cargo_statusControllers.createCargo_status);
cargo_statusRouter.delete("/cargo_status/:id", cargo_statusControllers.deleteCargo_status);

module.exports = cargo_statusRouter;
*/