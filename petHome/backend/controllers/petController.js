// backend/controllers/petController.js
const Pet = require('../models/Pet');
const multer = require('multer');
const path = require('path');

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 2048 * 2048 } // 5MB limit
});

// Create Pet - This is now ONLY the controller function
exports.createPet = async (req, res) => {
  try {
    console.log("Body received:", req.body);     // Debugging
    console.log("Files received:", req.files);

    const pet = await Pet.create({
      name: req.body.name,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age ? Number(req.body.age) : null,
      gender: req.body.gender,
      description: req.body.description,
      location: req.body.location,
      owner: req.user.id,
      images: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
    });

    res.status(201).json(pet);
  } catch (err) {
    console.error("Create Pet Error:", err);
    res.status(400).json({ 
      message: err.message,
      details: err.errors 
    });
  }
};

// Export upload middleware so routes can use it
exports.upload = upload;