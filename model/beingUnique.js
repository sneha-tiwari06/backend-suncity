const mongoose = require('mongoose');

const beingUniqueSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const BeingUniqueContent = mongoose.model('BeingUniqueContent', beingUniqueSchema);

module.exports = BeingUniqueContent;
