const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  roles: [{ 
    type: String, 
    enum: ['adopter', 'petowner', 'caregiver', 'petwalker'], 
    default: ['adopter'] 
  }],
  
  location: String,
  phone: String,
  bio: String,
  
  // NEW: Profile Picture
  profilePic: { 
    type: String, 
    default: '/uploads/default-avatar.png' 
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);