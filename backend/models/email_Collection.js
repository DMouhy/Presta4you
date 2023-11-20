const mongoose = require('mongoose');

const emailList_Schema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, required: true }
})

const emailList_Collection = mongoose.model('emailList', emailList_Schema);

module.exports = emailList_Collection;