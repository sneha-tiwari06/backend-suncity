// models/academicSpectrumModel.js
const mongoose = require('mongoose');

const academicSpectrumSchema = new mongoose.Schema({
    faculty: { type: String, required: true },
    campusArea: { type: String, required: true },
    ageRange: { type: String, required: true },
    totalStudents: { type: Number, required: true },
    sports: { type: String, required: true },
    averageStudents: {
        eyp: { type: Number, required: true },
        primary: { type: Number, required: true }
    },
    studentTeacherRatio: {
        eyp: {
            numerator: Number,
            denominator: Number,
        },
        primary: {
            numerator: Number,
            denominator: Number,
        },
        secondary: {
            numerator: Number,
            denominator: Number,
        },
    },
});

module.exports = mongoose.model('AcademicSpectrum', academicSpectrumSchema);
