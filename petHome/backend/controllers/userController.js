const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Multer setup for profile pictures
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile (including roles)
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, location, phone, bio, roles } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (location) updateData.location = location;
    if (phone) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;

    // Handle roles properly
    if (roles) {
      let parsedRoles;
      try {
        parsedRoles = typeof roles === 'string' ? JSON.parse(roles) : roles;
      } catch (e) {
        parsedRoles = roles;
      }

      if (Array.isArray(parsedRoles) && parsedRoles.length > 0) {
        updateData.roles = parsedRoles;
      }
    }

    // Handle profile picture
    if (req.file) {
      updateData.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all caregivers
exports.getCaregivers = async (req, res) => {
  try {
    const caregivers = await User.find({ roles: 'caregiver' }).select('-password');
    res.json(caregivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export upload middleware
exports.uploadProfilePic = upload.single('profilePic');