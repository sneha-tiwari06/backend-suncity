// routes/academicSpectrumRoute.js
const express = require('express');
const router = express.Router();
const {
    createAcademicSpectrum,
    getAcademicSpectrums,
    getAcademicSpectrumById,
    updateAcademicSpectrum,
    deleteAcademicSpectrum
} = require('../controller/academicController');

// Define routes
router.post('/', createAcademicSpectrum);
router.get('/', getAcademicSpectrums);
router.get('/:id', getAcademicSpectrumById);
router.put('/:id', updateAcademicSpectrum);
router.delete('/:id', deleteAcademicSpectrum);

module.exports = router;
