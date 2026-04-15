const express = require('express');
const router = express.Router();

const { 
  getUserProfile, 
  updateUserProfile, 
  getCaregivers,
  uploadProfilePic 
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware');

// Get profile
router.get('/profile/:id', protect, getUserProfile);

// Update profile + profile picture
router.put('/profile/:id', protect, uploadProfilePic, updateUserProfile);

// Get caregivers
router.get('/caregivers', getCaregivers);

module.exports = router;