const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const multer = require('multer');
const path=require('path')
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sabarishkumar200r@gmail.com',
    pass: 'pgjsepwwopohiqzk',
  },
});


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password ,role,place,cost,city,state,phone} = req.body
  {console.log("city:",city)}
  if (!name || !email || !password || !role || !place || !phone || (role==='driver' && !cost)) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    place,
    cost,
    city,
    state,
    rating:0,
    phone,
    
  })
   

  if (user) {
    
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role:user.role,
      place:user.place,
      cost:user.cost,
      city:user.city,
      state:user.state,
      phone:user.phone,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role:user.role,
      place:user.place,
      cost:user.cost,
      city:user.city,
      state:user.state,
      phone:user.phone,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'driver' }).select('name place cost email city state phone')

  if (users) {
    res.status(200).json(users)
  } else {
    res.status(404)
    throw new Error('No users found')
  }
})
const sendEmail = asyncHandler(async(req, res) => {
  const { recipientEmail, subject, message } = req.body;

  const mailOptions = {
    from: 'sabarishkumar200r@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
})

// Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  sendEmail,
}
