const mongoose = require('mongoose');

const ONUSchema = new mongoose.Schema({
    slot: String,
    port: Number,
    ont_id: String,
    sn: String,
    state: String,
});

module.exports = mongoose.model('ONU',ONUSchema);