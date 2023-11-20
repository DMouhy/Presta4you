const mongoose = require('mongoose');

const reservation_Schema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String },
    done: { type: Boolean, required: true, default: false },
    created_at: { type: Date, required: true }
})

const reservation_Collection = mongoose.model('reservations', reservation_Schema);

module.exports = reservation_Collection;