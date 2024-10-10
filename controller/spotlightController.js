// controllers/spotlightController.js
const Spotlight = require('../model/spotlightModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Setup multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).array('images', 10); // Up to 10 images

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'suncity-school/spotlights' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        stream.end(file.buffer);
    });
};
// Create Spotlight
exports.createSpotlight = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            // Upload images to Cloudinary
            const imageUrls = [];
            for (const file of req.files) {
                const imageUrl = await uploadImageToCloudinary(file);
                imageUrls.push(imageUrl);
            }

            // Create Spotlight
            const { title, date, location, content } = req.body;
            const newSpotlight = new Spotlight({
                title,
                date,
                location,
                content,
                images: imageUrls
            });

            await newSpotlight.save();
            res.status(200).json({ message: 'Spotlight created successfully', spotlight: newSpotlight });
        } catch (error) {
            console.error('Error creating spotlight:', error); // Add this line
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};
// Get All Spotlights
exports.getSpotlights = async (req, res) => {
    try {
        const spotlights = await Spotlight.find();
        res.status(200).json(spotlights);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Spotlight by ID
exports.getSpotlightById = async (req, res) => {
    try {
        const spotlight = await Spotlight.findById(req.params.id);
        if (!spotlight) return res.status(404).json({ message: 'Spotlight not found' });
        res.status(200).json(spotlight);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Spotlight
exports.updateSpotlight = async (req, res) => {
    try {
        const spotlight = await Spotlight.findById(req.params.id);
        if (!spotlight) return res.status(404).json({ message: 'Spotlight not found' });

        const { title, date, location, content } = req.body;
        spotlight.title = title;
        spotlight.date = date;
        spotlight.location = location;
        spotlight.content = content;

        await spotlight.save();
        res.status(200).json({ message: 'Spotlight updated successfully', spotlight });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Spotlight
exports.deleteSpotlight = async (req, res) => {
    try {
        const spotlight = await Spotlight.findByIdAndDelete(req.params.id);
        if (!spotlight) return res.status(404).json({ message: 'Spotlight not found' });
        res.status(200).json({ message: 'Spotlight deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
