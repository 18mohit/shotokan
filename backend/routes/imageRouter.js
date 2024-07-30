const express = require('express');
const router = express.Router();
const galleryModel = require('../models/gallery-model');
// const upload = require('../config/multer-config');
const uploadFields = require('../config/multer-config');

// Route to get all images
router.get('/', async (req, res) => {
  try {
    const images = await galleryModel.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to upload an image
router.post('/create', uploadFields, async (req, res) => {
  try {
    let { description } = req.body;

    // Convert image buffer to base64 string
    let base64Image = req.file.buffer.toString('base64');

    let imageGallery = await galleryModel.create({
      image: base64Image,
      description,
    });
    res.status(201).json(imageGallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
