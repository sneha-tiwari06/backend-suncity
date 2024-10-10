const express = require('express');
const router = express.Router();
const multer = require('multer');
const bannerImageController = require('../controller/bannerController');

const storage = multer.memoryStorage(); // Store file in memory for upload to Cloudinary
const upload = multer({ storage: storage });
// Create a new banner image
router.post('/', upload.single('video'), bannerImageController.createBannerImage); // 'video' should match the field name in the form

// Get all banner images
router.get('/', bannerImageController.getAllBannerImages);

// Get a banner image by ID
router.get('/:id', bannerImageController.getBannerImageById);

// Update a banner image by ID
router.put('/:id', bannerImageController.updateBannerImage);

// Delete a banner image by ID
router.delete('/:id', bannerImageController.deleteBannerImage);

module.exports = router;
