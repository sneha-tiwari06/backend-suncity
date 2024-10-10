// routes/FacultyRoutes.js
const express = require('express');
const router = express.Router();
const learningController = require('../controller/learningController');

// Create Faculty
router.post('/', learningController.createLearning);

// Get All Faculty
router.get('/', learningController.getLearning);

// Get Faculty by ID
router.get('/:id', learningController.getLearningById);

// Update Faculty
router.put('/:id', learningController.updateLearning);

// Delete Faculty
router.delete('/:id', learningController.deleteLearning);

module.exports = router;
