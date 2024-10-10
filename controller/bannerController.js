const BannerImage = require('../model/bannerModel');

const cloudinary = require('../cloudinary_config');
const { Readable } = require('stream');
// Create a new banner image
exports.createBannerImage = async (req, res) => {
    try {
        const { alternateText } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Video file is required.' });
        }
        console.log(req.file); // This should log the file object if it's correctly uploaded

        // Create a readable stream from the buffer
        const stream = new Readable();
        stream.push(req.file.buffer);
        stream.push(null);

        const uploadResult = await new Promise((resolve, reject) => {
            stream.pipe(cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }));
        });

        const newBannerImage = new BannerImage({
            video: uploadResult.secure_url, // Cloudinary URL of the uploaded video/image
            alternateText,
        });

        await newBannerImage.save();
        res.status(201).json({ message: 'Banner image created successfully', data: newBannerImage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating banner image', error: error.message });
    }
};
// Get all banner images
exports.getAllBannerImages = async (req, res) => {
    try {
        const bannerImages = await BannerImage.find();
        res.status(200).json(bannerImages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving banner images', error });
    }
};

// Get a single banner image by ID
exports.getBannerImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const bannerImage = await BannerImage.findById(id);

        if (!bannerImage) {
            return res.status(404).json({ message: 'Banner image not found' });
        }

        res.status(200).json(bannerImage);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving banner image', error });
    }
};

// Update a banner image by ID
exports.updateBannerImage = async (req, res) => {
    try {
        const { id } = req.params;
        let updatedData = req.body;

        // Check if a file is uploaded
        if (req.file) {
            // Create a readable stream from the buffer
            const stream = new Readable();
            stream.push(req.file.buffer);
            stream.push(null);

            const uploadResult = await new Promise((resolve, reject) => {
                stream.pipe(cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }));
            });

            updatedData.video = uploadResult.secure_url; // Update the video URL
        }

        // Update the banner image in the database
        const updatedBannerImage = await BannerImage.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBannerImage) {
            return res.status(404).json({ message: 'Banner image not found' });
        }

        res.status(200).json({ message: 'Banner image updated successfully', data: updatedBannerImage });
    } catch (error) {
        res.status(500).json({ message: 'Error updating banner image', error: error.message });
    }
};


// Delete a banner image by ID
exports.deleteBannerImage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBannerImage = await BannerImage.findByIdAndDelete(id);

        if (!deletedBannerImage) {
            return res.status(404).json({ message: 'Banner image not found' });
        }

        res.status(200).json({ message: 'Banner image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting banner image', error });
    }
};
