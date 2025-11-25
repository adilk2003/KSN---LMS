
const express = require('express');
const router = express.Router();
// const cloudinary = require('cloudinary').v2; // Uncomment in prod

// Mock Cloudinary Config
/*
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
*/

// @route   POST /api/upload
// @desc    Upload image/video
// @access  Private
router.post('/', async (req, res) => {
  try {
    // In a real implementation with Multer and Cloudinary:
    // const result = await cloudinary.uploader.upload(req.file.path);
    // res.json({ url: result.secure_url });
    
    // MOCK RESPONSE
    setTimeout(() => {
        res.json({ 
            url: `https://picsum.photos/800/600?random=${Date.now()}`,
            message: "File uploaded successfully (Mock)"
        });
    }, 1500);
    
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
