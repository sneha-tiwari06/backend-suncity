const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'suncity-school/banner-video', // specify the folder where videos will be stored in Cloudinary
      allowed_formats: ['mp4', 'mkv'], // Add allowed video formats
  },
});
module.exports = { cloudinary };
