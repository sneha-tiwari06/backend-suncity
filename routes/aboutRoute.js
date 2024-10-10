const express = require('express');
const router = express.Router();
const aboutController = require('../controller/aboutController'); // Adjust the path based on your project structure

// Create About Content
router.post('/', aboutController.createAboutContent);

// Read All About Content
router.get('/', aboutController.getAllAboutContent);

// Read Single About Content
router.get('/:id', aboutController.getAboutContentById);

// Update About Content
router.put('/:id', aboutController.updateAboutContent);

// Delete About Content
router.delete('/:id', aboutController.deleteAboutContent);

module.exports = router;
