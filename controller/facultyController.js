// controllers/FacultyController.js
const Faculty = require('../model/facultyModel');
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
            { folder: 'suncity-school/faculty' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        stream.end(file.buffer);
    });
};

// Create Faculty
exports.createFaculty = async (req, res) => {
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

            // Create Faculty
            const { content } = req.body;
            console.log(req.body)
            const newFaculty = new Faculty({
                content,
                images: imageUrls
            });

            await newFaculty.save();
            res.status(201).json({ message: 'Faculty created successfully', faculty: newFaculty });
        } catch (error) {
            console.error('Error creating faculty:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};

// Get All Faculty
exports.getFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find();
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Faculty by ID
exports.getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Faculty
exports.updateFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

        const { content } = req.body;
        faculty.content = content;

        // If images are uploaded, update them
        if (req.files && req.files.length > 0) {
            const imageUrls = [];
            for (const file of req.files) {
                const imageUrl = await uploadImageToCloudinary(file);
                imageUrls.push(imageUrl);
            }
            faculty.images = imageUrls;
        }

        await faculty.save();
        res.status(200).json({ message: 'Faculty updated successfully', faculty });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Faculty
exports.deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
        res.status(200).json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
