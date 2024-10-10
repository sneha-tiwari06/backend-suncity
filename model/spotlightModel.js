const mongoose = require('mongoose');

const spotlightSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String, required: true }]
}, { timestamps: true });

const Spotlight = mongoose.model('Spotlight', spotlightSchema);

module.exports = Spotlight;
