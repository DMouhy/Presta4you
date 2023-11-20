const mongoose = require('mongoose');

const admin_Schema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const admin_Collection = mongoose.model('admins', admin_Schema);

module.exports = admin_Collection;