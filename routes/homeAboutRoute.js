const express = require('express');
const router = express.Router();
const aboutHomeController = require('../controller/homeAboutController');

// Create About Content
router.post('/', aboutHomeController.createHomeAboutContent);

// Read All About Content
router.get('/', aboutHomeController.getAllHomeAboutContent);

// Read Single About Content
router.get('/:id', aboutHomeController.getHomeAboutContentById);

// Update About Content
router.put('/:id', aboutHomeController.updateHomeAboutContent);

// Delete About Content
router.delete('/:id', aboutHomeController.deleteHomeAboutContent);

module.exports = router;
