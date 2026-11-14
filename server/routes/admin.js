const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const { authMiddleware, requireRole } = require('../middleware/auth');
const router = express.Router();

// This applies the bouncer to EVERY route in this file
router.use(authMiddleware, requireRole(['admin']));

// Get all users (without their passwords)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete any post
router.delete('/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted by admin' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;