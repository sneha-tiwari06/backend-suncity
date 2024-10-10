const express = require('express');
const router = express.Router();
const beingUniqueController = require('../controller/being-unique'); // Adjust the path based on your project structure

// Create About Content
router.post('/', beingUniqueController.createUniqueContent);

// Read All About Content
router.get('/', beingUniqueController.getAllUniqueContent);

// Read Single About Content
router.get('/:id', beingUniqueController.getUniqueContentById);

// Update About Content
router.put('/:id', beingUniqueController.updateUniqueContent);

// Delete About Content
router.delete('/:id', beingUniqueController.deleteUniqueContent);

module.exports = router;
