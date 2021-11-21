const mongoose = require('mongoose');

const cargostatusSchema = new mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    status_id: Number,
    status_name: String
});

exports.schema = cargostatusSchema;

exports.Cargo_status = mongoose.model('Cargo_status', cargostatusSchema);

