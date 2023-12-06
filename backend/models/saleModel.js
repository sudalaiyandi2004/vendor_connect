const mongoose = require('mongoose')

const saleSchema = mongoose.Schema(
  {
    fuser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tuser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    duser: {
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
    fplace:{
      type: String,
      required: [true, 'Please add a place'],
    },
    tplace:{
      type: String,
      required: [true, 'Please add a place'],
    },
    fname:{
      type: String,
      required: [true, 'Please add a name'],
    },
    tname:{
      type: String,
      required: [true, 'Please add a name'],
    },
    driver:{
      type: String,
      required: [true, 'Please add a name'],
    },
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Sale', saleSchema)
