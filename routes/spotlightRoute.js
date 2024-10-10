// routes/spotlightRoutes.js
const express = require('express');
const router = express.Router();
const spotlightController = require('../controller/spotlightController');

// Create Spotlight
router.post('/', spotlightController.createSpotlight);

// Get All Spotlights
router.get('/', spotlightController.getSpotlights);

// Get Spotlight by ID
router.get('/:id', spotlightController.getSpotlightById);

// Update Spotlight
router.put('/:id', spotlightController.updateSpotlight);

// Delete Spotlight
router.delete('/:id', spotlightController.deleteSpotlight);

module.exports = router;
