const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: String,
  age: Number,
  gender: String,
  description: String,
  location: String,
  images: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isAdopted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', petSchema);