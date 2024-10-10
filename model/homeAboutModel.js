const mongoose = require('mongoose');

const aboutHomeSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    contentPara: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AboutHomeContent = mongoose.model('AboutHomeContent', aboutHomeSchema);

module.exports = AboutHomeContent;
