const mongoose = require('mongoose');

const learningSchema = new mongoose.Schema({
    contentElementary: {
        type: String,
        required: true,
    },
    imagesElementary: {
        type: [String],
        required: true,
    },
    contentPrimary: {
        type: String,
        required: true,
    },
    imagesPrimary: {
        type: [String],
        required: true,
    },
    contentMiddle: {
        type: String,
        required: true,
    },
    imagesMiddle: {
        type: [String],
        required: true,
    },
    contentSecondary: {
        type: String,
        required: true,
    },
    imagesSecondary: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Learning', learningSchema);
