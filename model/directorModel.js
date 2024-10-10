const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    personName: { type: String, required: true }, // Change name to personName
    content: { type: String, required: true },
    designation: { type: String, required: true },
    images: { type: [String], required: true }, // Array of image URLs
});

const Director = mongoose.model('Director', DirectorSchema);
module.exports = Director;
