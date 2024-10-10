const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    designation: { type: String, required: true },
    university: { type: String, required: true },
    images: [{ type: String, required: true }]
}, { timestamps: true });

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
