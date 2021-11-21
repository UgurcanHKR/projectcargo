const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    vehicle_id: Number,
    vehicle_name: String,
    vehicle_cargosize: Number,
    vehicle_volume: Number,
    fuel_consumption: Number,
});

exports.schema = vehicleSchema;

exports.Vehicle = mongoose.model('Vehicle', vehicleSchema);
