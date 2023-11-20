const mongoose = require('mongoose');

const image_Schema = new mongoose.Schema({
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    imageType: { type: String, required: true },
    alt: { type: String, required: true },
    used: { type: Boolean, default: false },
    folder: { type: String, required: true },
    whereUsed: { type: String, require: true, default: '' }, // billboard OR logo...
    caption: { type: String }
})

const image_Collection = mongoose.model('images', image_Schema);

module.exports = image_Collection;