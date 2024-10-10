const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    awardName: {
        type: String,
        required: true,
    },
    awardby: {
        type: String,
        required: true,
    },
    awardyear: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AwardContent = mongoose.model('AwardContent', awardSchema);

module.exports = AwardContent;
