const Director = require('../model/directorModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Setup multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('images');  // Expecting a single image file

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
            { folder: 'suncity-school/director', format: 'webp' },  // Ensure the format is set (e.g., webp)
           (error, result) => {
                if (error) {
                    console.error('Cloudinary Upload Error:', error);
                    return reject(error);
                }
                console.log('Cloudinary Upload Result:', result); // Log the result to debug
                return resolve(result.secure_url);
            }
        );
        stream.end(file.buffer); // Ensure file buffer is passed correctly
    });
};

// Create Director
exports.createDirector = (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            let imageUrls = null;

            // Only upload the image if there's a file
            if (req.file) {
                imageUrls = await uploadImageToCloudinary(req.file);
            }

            const { heading, personName, content, designation } = req.body;
            
            if (!heading || !personName || !content || !designation) {
                return res.status(400).json({ message: 'All fields are required!' });
            }

            // Create Director entry
            const newDirector = new Director({
                heading,
                personName,
                content,
                designation,
                images: imageUrls,  // Saving image URL, if available
            });

            await newDirector.save();
            res.status(200).json({ message: 'Director created successfully', director: newDirector });
        } catch (error) {
            console.error('Error creating director:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};

// Get All Directors
exports.getDirectors = async (req, res) => {
    try {
        const directors = await Director.find();
        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Director by ID
exports.getDirectorById = async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) return res.status(404).json({ message: 'Director not found' });
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Director
exports.updateDirector = (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const director = await Director.findById(req.params.id);
            if (!director) return res.status(404).json({ message: 'Director not found' });

            const { heading, personName, content, designation } = req.body;

            if (!heading || !personName || !content || !designation) {
                return res.status(400).json({ message: 'All fields are required!' });
            }

            // Check if a new image is being uploaded
            let imageUrls = director.image;  // Keep the existing image by default

            if (req.file) {
                imageUrls = await uploadImageToCloudinary(req.file);
            }

            // Update fields
            director.heading = heading;
            director.personName = personName;
            director.content = content;
            director.designation = designation;
            director.images = imageUrls;  // Update with new image URL, if provided

            await director.save();
            res.status(200).json({ message: 'Director updated successfully', director });
        } catch (error) {
            console.error('Error updating director:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};

// Delete Director
exports.deleteDirector = async (req, res) => {
    try {
        const director = await Director.findByIdAndDelete(req.params.id);
        if (!director) return res.status(404).json({ message: 'Director not found' });
        res.status(200).json({ message: 'Director deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
