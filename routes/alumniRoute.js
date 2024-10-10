// routes/spotlightRoutes.js
const express = require('express');
const router = express.Router();
const alumniController = require('../controller/alumniController');

// Create Spotlight
router.post('/', alumniController.createAlumni);

// Get All Spotlights
router.get('/', alumniController.getAlumni);

// Get Spotlight by ID
router.get('/:id', alumniController.getAlumniId);

// Update Spotlight
router.put('/:id', alumniController.updateAlumni);

// Delete Spotlight
router.delete('/:id', alumniController.deleteAlumni);

module.exports = router;
