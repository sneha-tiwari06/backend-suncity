const express = require('express');
const router = express.Router();
const awardController = require('../controller/awardcontroller'); // Adjust the path based on your project structure

// Create About Content
router.post('/', awardController.createAwardContent);

// Read All About Content
router.get('/', awardController.getAllAwardContent);

// Read Single About Content
router.get('/:id', awardController.getAwardContentById);

// Update About Content
router.put('/:id', awardController.updateAwardContent);

// Delete About Content
router.delete('/:id', awardController.deleteAwardContent);

module.exports = router;
