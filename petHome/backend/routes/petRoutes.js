// backend/routes/petRoutes.js
const express = require('express');
const router = express.Router();

// ✅ Import what you need
const Pet = require('../models/Pet');                    // ← Add this line
const { createPet } = require('../controllers/petController');
const protect = require('../middleware/authMiddleware');

// Multer setup (for image upload)
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.post('/', protect, upload.array('images', 5), createPet);

// Get all pets
router.get('/', async (req, res) => {                    // ← Removed protect for now (optional)
  try {
    const pets = await Pet.find().populate('owner', 'name location');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single pet
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('owner', 'name location');
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;