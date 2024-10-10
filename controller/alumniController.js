const Alumni = require('../model/alumniModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Setup multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).array('images'); // Change to array

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Function to upload image to Cloudinary
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'suncity-school/alumni' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        stream.end(file.buffer);
    });
};

// Create Alumni
exports.createAlumni = (req, res) => {
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

            // Create Alumni entry
            const { designation, university } = req.body;
            const newAlumni = new Alumni({ // Change to Alumni
                designation,
                university,
                images: imageUrls,
            });

            await newAlumni.save();
            res.status(200).json({ message: 'Alumni created successfully', alumni: newAlumni });
        } catch (error) {
            console.error('Error creating alumni:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};

// Get All Alumni
exports.getAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find();
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Alumni by ID
exports.getAlumniId = async (req, res) => {
    try {
        const alumni = await Alumni.findById(req.params.id);
        if (!alumni) return res.status(404).json({ message: 'Alumni not found' });
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Alumni
exports.updateAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.findById(req.params.id);
        if (!alumni) return res.status(404).json({ message: 'Alumni not found' });

        const { designation, university } = req.body;
        alumni.designation = designation; // Change to alumni
        alumni.university = university;   // Change to alumni

        await alumni.save();
        res.status(200).json({ message: 'Alumni updated successfully', alumni });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Alumni
exports.deleteAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.findByIdAndDelete(req.params.id);
        if (!alumni) return res.status(404).json({ message: 'Alumni not found' });
        res.status(200).json({ message: 'Alumni deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
