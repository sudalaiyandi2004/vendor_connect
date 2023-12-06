const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    produce: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    weight:{
      type: Number,
      required: [true, 'Please add a weight'],
    },
    price:{
      type: Number,
      required: [true, 'Please add a price'],
    },
    place:{
      type: String,
      required: [true, 'Please add a place'],
    },
    name:{
      type: String,
      required: [true, 'Please add a price'],
    },
    phone:{
      type: Number,
      
    },
    
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Goal', goalSchema)
