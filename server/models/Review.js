// filepath: server/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  date: {
    type: String,
    default: () => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
      const now = new Date();
      return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);