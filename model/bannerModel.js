const mongoose = require('mongoose');

const bannerImageSchema = new mongoose.Schema({
    video: {
        type: String,
        required: true,
    },
    alternateText: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const BannerImage = mongoose.model('BannerImage', bannerImageSchema);

module.exports = BannerImage;
