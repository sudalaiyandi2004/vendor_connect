const express = require('express')
const router = express.Router()
const multer = require('multer');
const path=require('path')
const User = require('../models/userModel')
const Country=require('country-state-city').Country
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  sendEmail,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/getAll',getAllUsers)
router.post('/send',sendEmail)
router.get('/:id',async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID in the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Error fetching user' });
  }
});
router.get('/get/:id',async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID in the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Error fetching user' });
  }
});
const { ObjectId } = require('mongodb'); // Import ObjectId if you're using MongoDB

// ...

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  console.log('hi')
  console.log(updatedData)
  // Check if id is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    // Update only specific fields in the user document
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedData }, // Use $set to update specific fields
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
    console.log("success")
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router
