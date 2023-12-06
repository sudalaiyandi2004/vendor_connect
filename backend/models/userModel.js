const mongoose = require('mongoose')
const Goal = require('../models/goalModel')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      required: [true, 'Please add a password'],
    },
    place: {
      type: String,
      required: [true, 'Please add a place'],
    },
    cost: {
      type: Number,
    },
    city: {
      type: String,
      required: [true, 'Please add a place'],
    },
    phone: {
      type: Number,
      required: [true, 'Please add a Phone number'],
    },
    state: {
      type: String,
      required: [true, 'Please add a place'],
    },
    updatedData:{
      type: Number,
    },
    image:{
      type: String,
      
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
