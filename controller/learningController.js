const Learning = require('../model/learningModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Setup multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
    { name: 'imagesElementary', maxCount: 10 },
    { name: 'imagesPrimary', maxCount: 10 },
    { name: 'imagesMiddle', maxCount: 10 },
    { name: 'imagesSecondary', maxCount: 10 }
]); // Fields for different image categories

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'suncity-school/learning-stage' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        stream.end(file.buffer);
    });
};

// Create Learning Stage
exports.createLearning = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            // Upload images for each stage to Cloudinary
            const imagesElementary = req.files['imagesElementary']
                ? await Promise.all(req.files['imagesElementary'].map(file => uploadImageToCloudinary(file)))
                : [];
            const imagesPrimary = req.files['imagesPrimary']
                ? await Promise.all(req.files['imagesPrimary'].map(file => uploadImageToCloudinary(file)))
                : [];
            const imagesMiddle = req.files['imagesMiddle']
                ? await Promise.all(req.files['imagesMiddle'].map(file => uploadImageToCloudinary(file)))
                : [];
            const imagesSecondary = req.files['imagesSecondary']
                ? await Promise.all(req.files['imagesSecondary'].map(file => uploadImageToCloudinary(file)))
                : [];

            // Create Learning Stage
            const {
                contentElementary, contentPrimary, contentMiddle, contentSecondary
            } = req.body;

            const newLearning = new Learning({
                contentElementary,
                imagesElementary,
                contentPrimary,
                imagesPrimary,
                contentMiddle,
                imagesMiddle,
                contentSecondary,
                imagesSecondary,
            });

            await newLearning.save();
            res.status(201).json({ message: 'Learning stage created successfully', learning: newLearning });
        } catch (error) {
            console.error('Error creating learning stage:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};

// Get All Faculty
exports.getLearning = async (req, res) => {
    try {
        const learning = await Learning.find();
        res.status(200).json(learning);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Faculty by ID
exports.getLearningById = async (req, res) => {
    try {
        const learning = await Learning.findById(req.params.id);
        if (!learning) return res.status(404).json({ message: 'Learning not found' });
        res.status(200).json(learning);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Learning Stage
exports.updateLearning = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const learning = await Learning.findById(req.params.id);
            if (!learning) return res.status(404).json({ message: 'Learning stage not found' });

            const {
                contentElementary, contentPrimary, contentMiddle, contentSecondary
            } = req.body;

            // Update content fields
            learning.contentElementary = contentElementary || learning.contentElementary;
            learning.contentPrimary = contentPrimary || learning.contentPrimary;
            learning.contentMiddle = contentMiddle || learning.contentMiddle;
            learning.contentSecondary = contentSecondary || learning.contentSecondary;

            // Update images if new files are uploaded
            if (req.files['imagesElementary']) {
                learning.imagesElementary = await Promise.all(
                    req.files['imagesElementary'].map(file => uploadImageToCloudinary(file))
                );
            }
            if (req.files['imagesPrimary']) {
                learning.imagesPrimary = await Promise.all(
                    req.files['imagesPrimary'].map(file => uploadImageToCloudinary(file))
                );
            }
            if (req.files['imagesMiddle']) {
                learning.imagesMiddle = await Promise.all(
                    req.files['imagesMiddle'].map(file => uploadImageToCloudinary(file))
                );
            }
            if (req.files['imagesSecondary']) {
                learning.imagesSecondary = await Promise.all(
                    req.files['imagesSecondary'].map(file => uploadImageToCloudinary(file))
                );
            }

            await learning.save();
            res.status(200).json({ message: 'Learning stage updated successfully', learning });
        } catch (error) {
            console.error('Error updating learning stage:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};
// Delete Faculty
exports.deleteLearning = async (req, res) => {
    try {
        const learning = await Learning.findByIdAndDelete(req.params.id);
        if (!learning) return res.status(404).json({ message: 'Learning not found' });
        res.status(200).json({ message: 'Learning deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
