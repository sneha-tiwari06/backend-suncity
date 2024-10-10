// routes/spotlightRoutes.js
const express = require('express');
const router = express.Router();
const directorController = require('../controller/directorController');

// Create Spotlight
router.post('/', directorController.createDirector);

// Get All Spotlights
router.get('/', directorController.getDirectors);

// Get Spotlight by ID
router.get('/:id', directorController.getDirectorById);

// Update Spotlight
router.put('/:id', directorController.updateDirector);

// Delete Spotlight
router.delete('/:id', directorController.deleteDirector);

module.exports = router;
