const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET all reviews
router.get('/', async (req, res) => {
  console.log('GET /api/reviews request received');
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    console.log(`Found ${reviews.length} reviews`);
    res.json(reviews);
  } catch (error) {
    console.error('GET /api/reviews error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST a new review
router.post('/', async (req, res) => {
  console.log('POST /api/reviews request received:', req.body);
  try {
    const { name, content, rating } = req.body;
    
    // Create new review
    const newReview = new Review({
      name,
      content,
      rating
    });
    
    const savedReview = await newReview.save();
    console.log('Review saved successfully:', savedReview);
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('POST /api/reviews error:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;