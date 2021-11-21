const mongoose = require('mongoose');

const cargocenterSchema = new mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    center_id: Number,
    center_name: String,
    loc_x: Number,
    loc_y: Number,
});

exports.schema = cargocenterSchema;

exports.Cargo_center = mongoose.model('Cargo_center', cargocenterSchema);
