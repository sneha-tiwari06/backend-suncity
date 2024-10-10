const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AboutContent = mongoose.model('AboutContent', aboutSchema);

module.exports = AboutContent;
