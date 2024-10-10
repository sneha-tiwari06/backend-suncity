// routes/FacultyRoutes.js
const express = require('express');
const router = express.Router();
const facultyController = require('../controller/facultyController');

// Create Faculty
router.post('/', facultyController.createFaculty);

// Get All Faculty
router.get('/', facultyController.getFaculty);

// Get Faculty by ID
router.get('/:id', facultyController.getFacultyById);

// Update Faculty
router.put('/:id', facultyController.updateFaculty);

// Delete Faculty
router.delete('/:id', facultyController.deleteFaculty);

module.exports = router;
