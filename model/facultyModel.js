const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
