const mongoose = require('mongoose');

const cargoinfoSchema = new mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    cargo_id: Number,
    center_id: Number,
    vehicle_id: Number,
    cargo_weight: Number,
    cargo_volume: Number,
    status_id: Number,
    recipient_name: String,
    recipient_surname: String,
    recipient_address: String,
    loc_x: Number,
    loc_y: Number,
});

exports.schema = cargoinfoSchema;

exports.Cargo_info = mongoose.model('Cargo_info', cargoinfoSchema);

